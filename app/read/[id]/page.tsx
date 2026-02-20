
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

  return (
    <div className="h-screen w-screen bg-stone-900 flex flex-col">
      <header className="bg-stone-800 text-white p-4 flex justify-between items-center shadow-md z-1">
        <h1 className="text-xl font-bold">{newspaper.title} <span className="text-stone-400 text-sm">({newspaper.year})</span></h1>
        <a href="/" className="text-red-400 hover:text-red-300">Close ✕</a>
      </header>
      <div className="flex-grow relative">
         <iframe 
          src={newspaper.pdf_path} 
          className="w-full h-full border-none"
          title={`PDF of ${newspaper.title}`}
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
