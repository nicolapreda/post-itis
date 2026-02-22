import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { deleteNewspaper } from '@/app/lib/admin-actions';

// Ensure this is dynamic so we see latest data
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  console.log('[PAGE/ADMIN] Avvio caricamento dashboard di amministrazione...');
  // Fetch existing newspapers
  const [rows] = await db.query('SELECT * FROM newspapers ORDER BY created_at DESC');
  const newspapers = rows as any[];
  console.log(`[PAGE/ADMIN] Trovati ${newspapers.length} giornalini caricati nel sistema.`);

  async function uploadAction(formData: FormData) {
    'use server';
    
    // We can call our existing API route logic here or fetch against the API
    // Since we are in a Server Action context, calling API route via fetch is tricky due to localhost
    // Let's rely on client-side fetch for upload for progress bar support, 
    // OR implement upload logic here.
    // Given the previous setup used client-side form, let's keep that but add the list below.
    // WAIT: This file was previously a Client Component? Check import at top.
    // The previous file had 'use client' ? Let's check.
    // Ah, I need to check if the file was client or server.
    // If I make it Server Component, I can't use useState for the form.
    // I should split the List and Form.
  }

  return (
    <div className="min-h-screen bg-stone-100 p-8 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold font-display text-[#ea1d24]">ADMIN DASHBOARD</h1>
        </div>
        
        <div className="flex flex-col gap-12">
          {/* UPLOAD FORM - Client Component Wrapper */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#ea1d24]">
            <h2 className="text-2xl font-bold mb-6 font-display border-b pb-2">CARICA NUOVO NUMERO</h2>
            <UploadForm />
          </div>

          {/* LIST - Server Rendered */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-black">
            <h2 className="text-2xl font-bold mb-6 font-display border-b pb-2">GESTISCI ARCHIVIO ({newspapers.length})</h2>
            <div className="space-y-12">
              {newspapers.length === 0 && <p className="text-gray-500 italic">Nessun numero trovato.</p>}
              
              {(() => {
                // Inline grouping for server component simplicity
                const grouped = newspapers.reduce((acc: any, paper) => {
                  const y = paper.year;
                  if (!acc[y]) acc[y] = [];
                  acc[y].push(paper);
                  return acc;
                }, {});
                
                const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
                
                return years.map(year => (
                  <div key={year} className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h3 className="text-2xl font-display text-[#ea1d24] mb-4 border-b border-stone-200 pb-2">{year}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {grouped[year].map((paper: any) => (
                        <div key={paper.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-200 shrink-0 relative overflow-hidden rounded shadow-inner">
                              {paper.cover_path ? <img src={paper.cover_path} className="object-cover w-full h-full" alt="" /> : null}
                            </div>
                            <div>
                              <p className="font-bold text-base leading-tight">{paper.title}</p>
                              <p className="text-xs text-gray-400 mt-1">ID: {paper.id}</p>
                            </div>
                          </div>
                          
                          <form action={deleteNewspaper.bind(null, paper.id)}>
                            <button type="submit" className="text-stone-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all" title="Delete">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Client Component for the Form to verify it works
import UploadForm from './UploadForm';
