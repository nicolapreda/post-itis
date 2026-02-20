
"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#ea1d24] border-y-4 border-black py-2 mb-12">
      <motion.div
        className="flex whitespace-nowrap font-display text-6xl md:text-8xl uppercase tracking-tighter text-white"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <span className="mx-4">POST-ITIS ARCHIVE • SUCCEDE SOLO AL PALEOCAPA •</span>
        <span className="mx-4">POST-ITIS ARCHIVE • SUCCEDE SOLO AL PALEOCAPA •</span>
        <span className="mx-4">POST-ITIS ARCHIVE • SUCCEDE SOLO AL PALEOCAPA •</span>
        <span className="mx-4">POST-ITIS ARCHIVE • SUCCEDE SOLO AL PALEOCAPA •</span>
      </motion.div>
    </div>
  );
}
