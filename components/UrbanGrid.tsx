
"use client";

import IssueCard from './IssueCard';
import Marquee from './Marquee';
import Footer from './Footer';
import { motion } from "framer-motion";

interface Newspaper {
  id: number;
  title: string;
  coverPath: string | null;
  year: string;
}

interface UrbanGridProps {
  newspapers: Newspaper[];
}

export default function UrbanGrid({ newspapers }: UrbanGridProps) {
  // Group newspapers by year
  const groupedNewspapers = newspapers.reduce((groups, paper) => {
    const year = paper.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(paper);
    return groups;
  }, {} as Record<string, Newspaper[]>);

  // Sort years descending (newest first)
  const sortedYears = Object.keys(groupedNewspapers).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-white pb-20 pt-20">
      {/* Header */}
      <div className="pt-8"></div>

      <Marquee />

      {/* Grid */}
      <div className="px-4 md:px-12 mx-auto max-w-[1600px]">
        {sortedYears.map((year) => (
          <div key={year} className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-5xl md:text-6xl text-[#ea1d24]">{year}</h2>
              <div className="h-1 flex-grow bg-black"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {groupedNewspapers[year].map((paper, index) => (
                 <div key={paper.id} className="transform transition-all">
                   <IssueCard {...paper} index={index} />
                 </div>
              ))}
            </div>
          </div>
        ))}

        {sortedYears.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Nessuna pubblicazione trovata.
          </div>
        )}
      </div>
       
      <Footer />
    </div>
  );
}
