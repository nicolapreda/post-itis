
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IssueProps {
  id: number;
  title: string;
  coverPath: string | null;
  year: string;
  index: number;
}

export default function IssueCard({ id, title, coverPath, year, index }: IssueProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/read/${id}`} className="block relative z-10">
        <motion.div
           className="relative aspect-[1/1.414] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
           whileHover={{ 
             scale: 1.02,
             boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
             translateY: -4,
             translateX: -4
           }}
           transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {coverPath ? (
            <img
              src={coverPath}
              alt={title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-[#ea1d24]">
               <span className="font-display text-4xl uppercase -rotate-12 border-4 border-black p-2 bg-white text-black">
                 MISSING COVER
               </span>
             </div>
          )}
          
          {/* Overlay Text on Hover - Editorial Style */}
          <div className="absolute inset-x-0 bottom-0 bg-black p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-display text-xl uppercase tracking-tighter leading-none">
              {title}
            </h3>
            <p className="text-[#ea1d24] text-xs mt-1 border-t border-white/30 pt-1">
              {year} • ARCHIVE
            </p>
          </div>
        </motion.div>
      </Link>
      
      {/* Decorative Sticker behind */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-2 border-black z-20 rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
        <span className="text-white font-bold text-xs">PDF</span>
      </div>
    </motion.div>
  );
}
