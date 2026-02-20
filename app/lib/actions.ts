
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function logout() {
    await signOut();
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
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
