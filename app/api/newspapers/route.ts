
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM newspapers ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch newspapers' }, { status: 500 });
    }
}
