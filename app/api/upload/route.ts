
import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, rename } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import db from '@/lib/db';
import sharp from 'sharp';

const execAsync = promisify(exec);

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const cover = formData.get('cover') as File | null;
        const title = formData.get('title') as string;
        const year = formData.get('year') as string;

        if (!file || !title || !year) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        // --- 1. Handle PDF Upload & Compression ---
        const pdfBuffer = Buffer.from(await file.arrayBuffer());
        const timestamp = Date.now();
        const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filename = `issue-${timestamp}-${safeName}`;
        const filePath = path.join(uploadDir, filename);

        // Save original PDF first
        await writeFile(filePath, pdfBuffer);

        let finalPdfPath = `/uploads/${filename}`;

        // Attempt PDF Compression (Ghostscript)
        try {
            const compressedFilename = `compressed-${filename}`;
            const compressedFilePath = path.join(uploadDir, compressedFilename);

            // Ghostscript command for ebook quality (good balance)
            const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${compressedFilePath}" "${filePath}"`;

            await execAsync(gsCommand);

            // If successful, replace original with compressed or just point to compressed
            // Let's keep compressed as the main file
            finalPdfPath = `/uploads/${compressedFilename}`;

            // Optional: Delete original if compression worked to save space
            await unlink(filePath);
        } catch (gsError) {
            console.warn('Ghostscript compression failed/skipped:', gsError);
            // Fallback: use original file
        }

        // --- 2. Handle Cover Image ---
        let coverPubPath = '';

        if (cover && cover.size > 0) {
            const coverBuffer = Buffer.from(await cover.arrayBuffer());
            const coverFilename = `cover-${timestamp}-${safeName.replace('.pdf', '')}.jpg`;
            const coverPath = path.join(uploadDir, coverFilename);

            // Compress and resize image using Sharp
            await sharp(coverBuffer)
                .resize({ width: 800, withoutEnlargement: true }) // Reasonable max width
                .jpeg({ quality: 80 })
                .toFile(coverPath);

            coverPubPath = `/uploads/${coverFilename}`;
        } else {
            // Legacy/Fallback: Try to find matching image in assets (optional, but requested behavior previously)
            // For now, if no cover uploaded, we leave it null or client handles it. 
            // The user explicitly asked for "load cover and pdf", so we expect a cover.
        }

        // --- 3. Save to Database ---
        try {
            const [result] = await db.execute(
                'INSERT INTO newspapers (title, year, pdf_path, cover_path) VALUES (?, ?, ?, ?)',
                [title, year, finalPdfPath, coverPubPath || null]
            );

            return NextResponse.json({ success: true, id: (result as any).insertId });
        } catch (dbError) {
            console.error('Database insertion failed:', dbError);
            return NextResponse.json(
                { error: 'File saved but database insert failed', path: finalPdfPath },
                { status: 503 }
            );
        }

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
