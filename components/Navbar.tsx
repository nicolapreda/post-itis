"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] // easeInOut cubic-bezier
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] // easeInOut cubic-bezier
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 h-20 flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link href="/" className="z-50">
           <img 
             src="/assets/title_red.png" 
             alt="POST-ITIS" 
             className="h-10 md:h-12 object-contain hover:opacity-80 transition-opacity"
           />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-bold uppercase tracking-wider">
          <Link 
            href="/" 
            className={`hover:text-[#ea1d24] transition-colors ${isActive('/') ? 'text-[#ea1d24]' : 'text-black'}`}
          >
            Home
          </Link>
          <Link 
            href="/chi-siamo" 
            className={`hover:text-[#ea1d24] transition-colors ${isActive('/chi-siamo') ? 'text-[#ea1d24]' : 'text-black'}`}
          >
            Chi Siamo
          </Link>
          
          {pathname.startsWith('/admin') ? (
            <form action={async () => {
              // We need to import the server action dynamically or pass it as prop if this was server component.
              // Since this is a Client Component, we can import server actions!
              const { logout } = await import('@/app/lib/actions');
              await logout();
            }}>
              <button className="bg-black text-white px-4 py-2 hover:bg-[#ea1d24] transition-colors">
                Logout
              </button>
            </form>
          ) : (
            <Link 
              href="/admin" 
              className="bg-black text-white px-4 py-2 hover:bg-[#ea1d24] transition-colors"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden z-50 flex flex-col gap-1.5 focus:outline-none"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-1 bg-black block origin-center"
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-1 bg-black block"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-1 bg-black block origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 text-2xl font-bold uppercase"
          >
            <Link 
              href="/" 
              onClick={toggleMenu}
              className={`hover:text-[#ea1d24] ${isActive('/') ? 'text-[#ea1d24]' : 'text-black'}`}
            >
              Home
            </Link>
            <Link 
              href="/chi-siamo" 
              onClick={toggleMenu}
              className={`hover:text-[#ea1d24] ${isActive('/chi-siamo') ? 'text-[#ea1d24]' : 'text-black'}`}
            >
              Chi Siamo
            </Link>
            
            {pathname.startsWith('/admin') ? (
               <form action={async () => {
                  const { logout } = await import('@/app/lib/actions');
                  await logout();
                  toggleMenu();
               }}>
                  <button className="bg-black text-white px-8 py-3 hover:bg-[#ea1d24]">
                    Logout
                  </button>
               </form>
            ) : (
              <Link 
                href="/admin" 
                onClick={toggleMenu}
                className="bg-black text-white px-8 py-3 hover:bg-[#ea1d24]"
              >
                Admin Area
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
