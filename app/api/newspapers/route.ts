
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    console.log('[API/NEWSPAPERS] Ricevuta richiesta GET per la lista completa dei giornalini.');
    try {
        const [rows] = await db.query('SELECT * FROM newspapers ORDER BY created_at DESC');
        console.log(`[API/NEWSPAPERS] Trovati ${(rows as any[]).length} risultati nel Database.`);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('[API/NEWSPAPERS] ERRORE: Query Database fallita durante GET:', error);
        return NextResponse.json({ error: 'Failed to fetch newspapers' }, { status: 500 });
    }
}
