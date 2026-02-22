
import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, rename } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import db from '@/lib/db';
import sharp from 'sharp';

const execAsync = promisify(exec);

export async function POST(request: Request) {
    console.log('[API/UPLOAD] Ricevuta nuova richiesta di upload.');
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const cover = formData.get('cover') as File | null;
        const title = formData.get('title') as string;
        const year = formData.get('year') as string;

        console.log(`[API/UPLOAD] Dati estratti: Titolo="${title}", Anno="${year}", PDF="${file?.name}" (${file?.size} bytes), Copertina=${cover ? 'Presente' : 'Assente'}`);

        if (!file || !title || !year) {
            console.error('[API/UPLOAD] ERRORE: Campi obbligatori mancanti.');
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        console.log(`[API/UPLOAD] Verifica/Creazione directory: ${uploadDir}`);
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
            console.log(`[API/UPLOAD] Tentativo di compressione PDF con Ghostscript... in ${compressedFilePath}`);
            const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${compressedFilePath}" "${filePath}"`;

            await execAsync(gsCommand);
            console.log(`[API/UPLOAD] Compressione PDF completata con successo!`);

            // If successful, replace original with compressed or just point to compressed
            // Let's keep compressed as the main file
            finalPdfPath = `/uploads/${compressedFilename}`;

            // Optional: Delete original if compression worked to save space
            await unlink(filePath);
        } catch (gsError) {
            console.warn(`[API/UPLOAD] Compressione Ghostscript fallita o skippata:`, gsError);
            // Fallback: use original file
        }

        // --- 2. Handle Cover Image ---
        let coverPubPath = '';

        if (cover && cover.size > 0) {
            const coverBuffer = Buffer.from(await cover.arrayBuffer());
            const coverFilename = `cover-${timestamp}-${safeName.replace('.pdf', '')}.jpg`;
            const coverPath = path.join(uploadDir, coverFilename);

            console.log(`[API/UPLOAD] Compressione ed elaborazione Copertina con Sharp...`);
            // Compress and resize image using Sharp
            await sharp(coverBuffer)
                .resize({ width: 800, withoutEnlargement: true }) // Reasonable max width
                .jpeg({ quality: 80 })
                .toFile(coverPath);
            console.log(`[API/UPLOAD] Copertina salvata in: ${coverPath}`);

            coverPubPath = `/uploads/${coverFilename}`;
        } else {
            // Legacy/Fallback: Try to find matching image in assets (optional, but requested behavior previously)
            // For now, if no cover uploaded, we leave it null or client handles it. 
            // The user explicitly asked for "load cover and pdf", so we expect a cover.
        }

        // --- 3. Save to Database ---
        try {
            console.log(`[API/UPLOAD] Salvataggio nel Database...`);
            const [result] = await db.execute(
                'INSERT INTO newspapers (title, year, pdf_path, cover_path) VALUES (?, ?, ?, ?)',
                [title, year, finalPdfPath, coverPubPath || null]
            );
            console.log(`[API/UPLOAD] SUCCESS! Inserito nel Database con ID: ${(result as any).insertId}`);

            return NextResponse.json({ success: true, id: (result as any).insertId });
        } catch (dbError) {
            console.error('[API/UPLOAD] ERRORE: Inserimento Database fallito!', dbError);
            return NextResponse.json(
                { error: 'File saved but database insert failed', path: finalPdfPath },
                { status: 503 }
            );
        }

    } catch (error) {
        console.error('[API/UPLOAD] ERRORE INTERNO DEL SERVER:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
