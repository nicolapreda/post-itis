
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import db from "./lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log(`[AUTH] Tentativo di login per l'utente: ${credentials.username}`);
                if (!credentials.username || !credentials.password) {
                    console.log(`[AUTH] Fallito: Username o Password mancanti.`);
                    return null;
                }

                // Query DB
                const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [credentials.username]);
                const user = (rows as any[])[0];

                if (!user) {
                    console.log(`[AUTH] Fallito: Utente non trovato nel database.`);
                    return null;
                }

                // Check password
                const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

                if (passwordsMatch) {
                    console.log(`[AUTH] SUCCESS: Login effettuato con successo per ${user.email}`);
                    return { id: user.id.toString(), name: "Admin", email: user.email };
                }

                console.warn(`[AUTH] ERROR: Password non corrispondente per ${user.email}`);
                return null;
            },
        }),
    ],
})
