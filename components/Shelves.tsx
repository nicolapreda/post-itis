
import Shelf from './Shelf';

interface Newspaper {
  id: number;
  title: string;
  coverPath: string | null;
  year: string;
}

interface ShelvesProps {
  newspapers: Newspaper[];
}

export default function Shelves({ newspapers }: ShelvesProps) {
  const groupedNewspapers = newspapers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<string, Newspaper[]>);

  const sortedYears = Object.keys(groupedNewspapers).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-[#f0f0f0] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-24 relative">
         <div className="absolute -inset-4 bg-red-100 blur-[80px] opacity-50 rounded-full"></div>
         <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 drop-shadow-sm tracking-tighter transform -rotate-2" style={{ fontFamily: 'Impact, sans-serif' }}>
          ARCHIVIO <br/><span className="text-black">POST-ITIS</span>
         </h1>
      </div>
      
      <div className="space-y-8">
        {sortedYears.map((year) => (
          <Shelf key={year} year={year} newspapers={groupedNewspapers[year]} />
        ))}
      </div>
    </div>
  );
}
