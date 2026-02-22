
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function logout() {
    console.log('[ACTION] Esecuzione logout richiesto dall\'utente...');
    await signOut();
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log('[ACTION] Inizio processo di autenticazione...');
    try {
        formData.append('redirectTo', '/admin');
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.error(`[ACTION] Errore di Autenticazione: ${error.type}`);
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenziali non valide.';
                default:
                    return 'Qualcosa è andato storto.';
            }
        }
        // NextAuth throws errors (like NEXT_REDIRECT) for redirects, so we MUST rethrow them
        throw error;
    }
}
