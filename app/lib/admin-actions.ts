
'use server';

import db from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function deleteNewspaper(id: number) {
    console.log(`[ACTION/DELETE] Avvio eliminazione record giornalino ID: ${id}`);
    try {
        // 1. Get file paths to delete files too? 
        // For now let's just delete the DB record to avoid deleting shared files
        // But ideally we should clean up.

        // 2. Delete from DB
        await db.execute('DELETE FROM newspapers WHERE id = ?', [id]);
        console.log(`[ACTION/DELETE] SUCCESSO: Giornalino ID: ${id} eliminato dal database.`);

        revalidatePath('/');
        revalidatePath('/admin');
    } catch (error) {
        console.error(`[ACTION/DELETE] ERRORE durante eliminazione ID: ${id}:`, error);
        throw error; // Re-throw to let Next.js handle it or just log
    }
}
