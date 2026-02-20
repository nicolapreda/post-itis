
import NewspaperCover from './NewspaperCover';

interface Newspaper {
  id: number;
  title: string;
  coverPath: string | null;
  year: string;
}

interface ShelfProps {
  year: string;
  newspapers: Newspaper[];
}

export default function Shelf({ year, newspapers }: ShelfProps) {
  return (
    <div className="mb-20 w-full max-w-7xl mx-auto perspective-container">
      {/* Year Label - Floating above shelf */}
      <div className="flex justify-start px-12 mb-[-10px] relative z-20">
         <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-stone-200 transform -rotate-1">
            <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
              {year}
            </h2>
         </div>
      </div>
      
      {/* The Shelf Wrapper */}
      <div className="relative pt-8">
        
        {/* Books/Papers */}
        <div className="flex flex-wrap items-end px-16 pb-[2px] gap-x-1 z-10 relative min-h-[220px]">
          {newspapers.length > 0 ? (
            newspapers.map((paper) => (
              <NewspaperCover key={paper.id} {...paper} />
            ))
          ) : (
            <div className="text-stone-400 italic p-4 font-serif">Nessuna pubblicazione...</div>
          )}
        </div>

        {/* The Physical Shelf */}
        <div className="relative z-0">
           {/* Top surface (where items sit) */}
           <div className="h-6 bg-[#8B5E3C] w-full transform origin-bottom-left shadow-inner rounded-sm relative overflow-hidden">
              {/* Wood grain pattern */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
           </div>
           
           {/* Front face (thickness) */}
           <div className="h-4 bg-[#6F4E37] w-full shadow-lg relative">
              <div className="absolute inset-0 bg-black/10"></div>
           </div>

           {/* Drop Shadow below shelf */}
           <div className="absolute top-full left-0 w-full h-12 bg-gradient-to-b from-black/20 to-transparent blur-md"></div>
        </div>
      
      </div>
    </div>
  );
}
