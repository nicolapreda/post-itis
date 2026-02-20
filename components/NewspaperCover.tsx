
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NewspaperCoverProps {
  id: number;
  title: string;
  coverPath: string | null;
  year: string;
}

export default function NewspaperCover({ id, title, coverPath, year }: NewspaperCoverProps) {
  const [rotation, setRotation] = useState(0);

  // Randomize rotation slightly for "messy" shelf look on mount
  useEffect(() => {
    setRotation(Math.random() * 6 - 3); // Random between -3 and 3 degrees
  }, []);

  return (
    <div 
      className="group relative flex flex-col items-center w-36 or-w-44 mx-1 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Link href={`/read/${id}`} className="block w-full aspect-[1/1.414] bg-[#fffdf5] relative transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl shadow-md border-r-2 border-b-2 border-gray-300/50 rounded-sm overflow-hidden text-neutral-800">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        {coverPath ? (
           <Image
            src={coverPath} 
            alt={`Cover of ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
             <div className="w-full border-b-2 border-red-800 mb-2 pb-1">
                <span className="font-extrabold text-red-700 text-lg uppercase tracking-tighter block leading-none">POST-ITIS</span>
             </div>
             
             <div className="flex-grow flex items-center justify-center">
                <h3 className="font-serif text-xl font-bold text-gray-900 leading-tight">{title}</h3>
             </div>

             <div className="w-16 h-16 border-4 border-double border-gray-300 rounded-full opacity-50 absolute bottom-4 right-4 rotate-12"></div>
             
             <div className="absolute bottom-2 left-0 w-full text-[10px] text-gray-500">
                {year} • Numero Unico
             </div>
          </div>
        )}
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </Link>
    </div>
  );
}
