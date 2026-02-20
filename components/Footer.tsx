
export default function Footer() {
  return (
    <footer className="w-full bg-black text-white p-8 mt-auto border-t-4 border-[#ea1d24]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
           <img 
             src="/assets/title_white.png" 
             alt="POST-ITIS" 
             className="h-16 object-contain mb-2"
           />
          <p className="text-sm opacity-70">
            Archivio Digitale ITIS P. Paleocapa
          </p>
        </div>

        <div className="text-sm flex flex-col items-center md:items-end gap-1">
          <p>
            Realizzato con ❤️ da <a href="https://predanicola.it" target="_blank" className="underline decoration-[#ea1d24] hover:text-[#ea1d24] transition-colors font-bold">Nicola Preda</a>
          </p>
          <p className="opacity-50 text-xs text-center md:text-right">
            © {new Date().getFullYear()} - All Rights Reserved <br className="md:hidden"/>
            <span className="hidden md:inline"> | </span>
            <a href="/admin" className="hover:text-[#ea1d24] transition-colors underline decoration-dotted">Admin Access</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
