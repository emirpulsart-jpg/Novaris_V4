import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: '/', label: 'Accueil', num: '01' },
    { id: '/agence', label: 'Agence', num: '02' },
    { id: '/contact', label: 'Contact', num: '03' },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center z-[1100] border-r border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-line bg-bg' 
          : 'border-transparent bg-transparent'
      }`}>
        <motion.div 
          whileHover={{ rotate: 90 }}
          className="w-6 h-6 md:w-8 md:h-8 border-2 border-white flex items-center justify-center rotate-45"
        >
          <Link to="/" className="w-full h-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white"></div>
          </Link>
        </motion.div>
      </div>

      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed top-0 left-16 md:left-20 right-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-10 z-[1000] border-b transition-all duration-300 ${
          isScrolled 
            ? 'border-line bg-bg/80 backdrop-blur-sm' 
            : 'border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="font-mono text-xs tracking-[0.3em] font-medium hidden md:block text-white/90">NOVARIS</div>
        
        <nav className="flex gap-6 md:gap-12" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = location.pathname === item.id;
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-label={`Accéder à la page ${item.label}`}
                className={`text-[9px] md:text-[10px] tracking-widest uppercase transition-all relative pb-1 h-3 flex items-center ${
                  isActive 
                    ? 'text-white border-b-2 border-accent font-bold' 
                    : 'text-zinc-500 hover:text-white opacity-60 hover:opacity-100'
                }`}
              >
                <span className="mono mr-1 md:mr-2 text-[8px] opacity-60">{item.num}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="font-mono text-[10px] text-muted uppercase hidden lg:block tracking-widest">Annecy / 45.8992° N</div>
      </motion.header>

      <aside className="fixed left-0 top-16 md:top-20 bottom-16 md:bottom-20 w-16 md:w-20 hidden md:flex flex-col items-center justify-center z-[1000] border-r border-line bg-bg">
        <div className="font-mono text-[10px] rotate-180 text-muted" style={{ writingMode: 'vertical-rl' }}>
          SCROLL TO DISCOVER — NOVARIS 2026
        </div>
      </aside>

      <footer className="fixed bottom-0 left-0 right-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-10 z-[1000] border-t border-line bg-bg/80 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase text-zinc-400">Status: Operational</span>
          </div>
          <div className="h-4 w-[1px] bg-line-light hidden md:block"></div>
          <div className="font-mono text-[10px] uppercase tracking-tighter hidden md:block text-muted">Build: v3.0.0-spa</div>
        </div>
        
        <div className="flex gap-4 md:gap-8 items-center">
          <Link 
            to="/contact"
            className="group flex items-center gap-2 md:gap-4 bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-[10px] md:text-xs transition-all hover:pr-8"
          >
            <span className="uppercase tracking-widest">Project Brief</span>
            <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="black"/>
            </svg>
          </Link>
        </div>
      </footer>
    </>
  );
}
