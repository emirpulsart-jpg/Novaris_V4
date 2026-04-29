import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const handleInitProject = (e: React.MouseEvent) => {
    if (location.pathname === '/contact') {
      e.preventDefault();
      const formElement = document.getElementById('briefing-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full border-t border-white/5 bg-bg relative z-20">
      {/* Contact Band */}
      <div className="px-6 md:px-20 lg:px-40 py-16 border-b border-white/5 bg-white/[0.01]">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Coordonnées Directes</div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-lg md:text-xl font-bold tracking-tighter">
              <a href="tel:+33458630047" className="hover:text-accent transition-colors">+33 4 58 63 00 47</a>
              <a href="mailto:NOVARIS.STUDIO@YAHOO.COM" className="hover:text-accent transition-colors uppercase">NOVARIS.STUDIO@YAHOO.COM</a>
            </div>
          </div>
          <div className="shrink-0 w-full lg:w-auto">
             <Link 
               to="/contact"
               onClick={handleInitProject}
               className="group relative flex items-center justify-center gap-6 px-10 py-6 border border-white overflow-hidden transition-all w-full lg:w-auto"
             >
               <span className="relative z-10 font-black text-xs tracking-[0.5em] uppercase">INITIER UN PROJET</span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <span className="absolute inset-0 flex items-center justify-center text-black font-black text-xs tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">ENVOYER UN MESSAGE</span>
             </Link>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="px-6 md:px-20 lg:px-40 py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-mono uppercase">
        <div className="tracking-widest">© 2026 NOVARIS. TOUS DROITS RÉSERVÉS.</div>
        <div className="hidden sm:block tracking-widest opacity-40">DESIGNED BY NOVARIS ENGINE v3.0</div>
      </div>
    </footer>
  );
}

