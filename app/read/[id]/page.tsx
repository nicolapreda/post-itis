
import db from '@/lib/db';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Ensure the ID is valid (number)
async function getNewspaper(id: string) {
  const [rows] = await db.query('SELECT * FROM newspapers WHERE id = ?', [id]);
  return (rows as any[])[0] as { title: string; pdf_path: string; year: string } | undefined;
}

export default async function ReadPage({ params }: PageProps) {
  // Awaiting params is required in newer Next.js versions for dynamic routes, 
  // though dependent on exact version. In 14+ it's safe.
  const { id } = await params;
  const newspaper = await getNewspaper(id);

  if (!newspaper) {
    notFound();
  }

  // Costruisci l'URL assoluto per il visualizzatore di Google Drive
  const siteUrl = 'https://post-itis.it';
  const absolutePdfUrl = `${siteUrl}${newspaper.pdf_path}`;
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`;

  return (
    <div className="h-screen w-screen bg-stone-900 flex flex-col">
      <header className="bg-stone-800 text-white p-4 flex justify-between items-center shadow-md z-10">
        <h1 className="text-xl font-bold truncate max-w-[80%]">{newspaper.title} <span className="text-stone-400 text-sm">({newspaper.year})</span></h1>
        <a href="/" className="text-red-400 hover:text-red-300 whitespace-nowrap ml-4">Close ✕</a>
      </header>
      <div className="flex-grow relative bg-stone-100 flex items-center justify-center">
         {/* Spinner/Testo di caricamento che sta dietro l'iframe finché non carica */}
         <div className="absolute flex flex-col items-center gap-4 text-stone-500 z-10">
           <svg className="animate-spin h-8 w-8 text-[#ea1d24]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="font-medium animate-pulse">Caricamento visualizzatore in corso...</p>
         </div>
         
         {/* Google Docs Viewer Iframe */}
         <iframe 
          src={viewerUrl} 
          className="w-full h-full border-none absolute inset-0 z-20"
          title={`PDF of ${newspaper.title}`}
          allowFullScreen
        />
        
        {/* Fallback / Download Action */}
        <div className="absolute bottom-6 right-6 z-10">
          <a 
            href={newspaper.pdf_path} 
            download
            className="bg-[#ea1d24] text-white font-bold py-3 px-6 rounded-full shadow-lg border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2"
          >
            <span>DOWNLOAD PDF</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m3 3l3-3m-3 3V3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
