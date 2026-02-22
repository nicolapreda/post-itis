import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request, props: { params: Promise<{ filename: string }> }) {
    const params = await props.params;
    const { filename } = params;

    // Security: prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const filePath = path.join(process.cwd(), 'public/uploads', filename);

    try {
        const fileBuffer = await readFile(filePath);

        let contentType = 'application/octet-stream';
        if (filename.endsWith('.pdf')) contentType = 'application/pdf';
        else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';
        else if (filename.endsWith('.png')) contentType = 'image/png';
        else if (filename.endsWith('.webp')) contentType = 'image/webp';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            },
        });
    } catch (error) {
        return new NextResponse('Not Found', { status: 404 });
    }
}
