# Post-Itis | Archivio Digitale ITIS Paleocapa

L'archivio digitale del giornalino scolastico dell'ITIS P. Paleocapa di Bergamo. Questa piattaforma permette agli utenti di sfogliare e leggere le edizioni storiche e recenti di Post-Itis tramite un visualizzatore PDF integrato, offrendo al contempo un'area di amministrazione sicura per il caricamento dei nuovi numeri.

## 🚀 Tecnologie Utilizzate

Il progetto è costruito su uno stack moderno, orientato alle performance e alla facilità di manutenzione:

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Linguaggio:** TypeScript
- **Stile:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** MySQL
- **Autenticazione:** [NextAuth.js (v5 Beta)](https://authjs.dev/)
- **Processamento Immagini:** Sharp (per l'ottimizzazione delle copertine usate nel CMS)
- **Deployment & Infrastruttura:** Docker & Docker Compose (per il DB e l'applicativo)

## 🛠️ Requisiti

Assicurati di avere installati sulla tua macchina di sviluppo:
- Node.js (v18 o superiore)
- npm (o pnpm/yarn)
- Docker e Docker Compose (per far girare il database locale in modo semplice)

## ⚙️ Configurazione per lo Sviluppo Locale

### 1. Clona il repository e installa le dipendenze

```bash
git clone https://github.com/nicolapreda/post-itis.git
cd post-itis
npm install
```

### 2. Configura le Variabili d'Ambiente (.env.local)

Per evitare conflitti con la produzione su Docker, lo sviluppo locale (`npm run dev`) utilizza il file `.env.local`. Crea un file `.env.local` nella root del progetto:

```env
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"
NEXTAUTH_URL="http://localhost:3000"
```

*Nota: Non committare mai le password reali nel repository! Usa `.env` per le config di Docker Compose e `.env.local` per i test veloci.*

### 3. Avvia il Database (MySQL via Docker)

Il progetto include un `docker-compose.yml` che avvia l'intero sistema. Per lo sviluppo locale, ti basta avviare solo il container MySQL e fare girare Next.js in locale:

```bash
# Avvia tutti i servizi definiti
docker-compose up -d
```
*(Assicurati che al suo interno il database definisca le tabelle necessarie in fase d'avvio o lancia uno script di seed se presente).*

### 4. Avvia il Server Next.js

```bash
npm run dev
```

Ora apri [http://localhost:3000](http://localhost:3000) col tuo browser per vedere l'applicazione in azione.

## 📁 Struttura e Feature Principali

- `app/page.tsx`: Homepage pubblica con la griglia dei giornalini.
- `app/read/[id]`: Pagina di visualizzazione dedicata con reader PDF a specchio interno.
- `app/admin`: Area di amministrazione protetta da NextAuth, per gestire (caricare, eliminare) i PDF e le copertine associate al DB MySQL.
- `app/lib/actions.ts`: Server Actions (Autenticazione, Logout).
- `app/api/upload`: Route Handler che processa l'upload dei file (PDF e Copertine), gestendo automaticamente la compressione.
- `app/uploads/[filename]`: Route Handler custom necessario per bypassare la cache statica in build di Next.js e servire file aggiunti dinamicamente nel file system (`public/uploads`) a run-time.

## 📝 Appunti su Docker in Produzione (Deploy)

Quando il sito gira interamente dentro a Docker:
1. I volumi in `docker-compose.yml` (`./public/uploads:/app/public/uploads`) si assicurano che i file caricati dinamicamente persistano sul disco del server e non spariscano durante i restart.
2. In caso di modifiche grosse o problemi col volume per le immagini:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

---
*Progetto sviluppato e mantenuto per l'ITIS P. Paleocapa.*
