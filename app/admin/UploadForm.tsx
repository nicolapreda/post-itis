
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecentSchoolYears } from '@/lib/utils';

export default function UploadForm() {
  const years = getRecentSchoolYears(10);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setProgress(0);
    setMessage('');

    const formData = new FormData(e.currentTarget);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setMessage('File caricato con successo! 🎉 Compressione completata.');
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        try {
            const result = JSON.parse(xhr.responseText);
            setMessage(`Errore: ${result.error || 'Qualcosa è andato storto'}`);
        } catch (e) {
            setMessage('Errore sconosciuto durante il caricamento');
        }
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      setMessage('Errore di rete.');
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="title">Titolo / Numero</label>
        <input 
          name="title" 
          type="text" 
          placeholder="Es. Numero 5 - Maggio" 
          className="w-full px-3 py-2 border rounded font-display tracking-wide"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="year">Anno Scolastico</label>
        <select name="year" className="w-full px-3 py-2 border rounded" required defaultValue={years[0]}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
        <label className="block text-sm font-bold mb-1 text-[#ea1d24]" htmlFor="cover">1. Copertina (Immagine)</label>
        <input 
          name="cover" 
          type="file" 
          accept="image/*"
          className="w-full px-3 py-2 border rounded bg-white"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
            Verrà compressa automaticamente. Formati supportati: JPG, PNG, WEBP.
        </p>
      </div>

      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
        <label className="block text-sm font-bold mb-1 text-[#ea1d24]" htmlFor="file">2. Giornalino (PDF)</label>
        <input 
          name="file" 
          type="file" 
          accept="application/pdf"
          className="w-full px-3 py-2 border rounded bg-white"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Il PDF verrà compresso automaticamente per il web.
        </p>
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div 
            className="bg-[#ea1d24] h-4 rounded-full transition-all duration-300 striped-progress" 
            style={{ width: `${progress}%` }}
          ></div>
           <p className="text-xs text-center mt-1 font-bold">{progress}% - Compressione in corso...</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={uploading}
        className={`w-full font-bold py-3 px-4 rounded text-white transition-colors uppercase tracking-wider ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ea1d24] hover:bg-black'}`}
      >
        {uploading ? 'Elaborazione...' : 'Carica e Comprimi'}
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded text-center text-sm font-bold ${message.includes('Errore') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <style jsx>{`
        .striped-progress {
            background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
            background-size: 1rem 1rem;
        }
      `}</style>
    </form>
  );
}
