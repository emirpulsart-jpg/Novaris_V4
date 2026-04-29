import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { Code, Cpu, Globe, Zap, ArrowDown, ChevronRight, Layers, ShieldCheck, Activity } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';

export default function Home() {
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Mouse position state for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Specific mouse position for the title glow
  const titleGlowX = useMotionValue(0);
  const titleGlowY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance only on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setExpertiseIndex((prev) => (prev < mainExpertises.length - 1 ? prev + 1 : 0));
    }, 2500); // Advance every 2.5 seconds

    return () => clearInterval(interval);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);

    if (!isMobile && titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      titleGlowX.set(clientX - rect.left);
      titleGlowY.set(clientY - rect.top);
    }
  };

  // Section Refs for scroll-linked animations
  const heroRef = useRef(null);
  const approachRef = useRef(null);
  const visionRef = useRef(null);
  const expertiseRef = useRef(null);
  const creationRef = useRef(null);
  const complementaryRef = useRef(null);

  // Scroll Progress Hooks
  const { scrollYProgress: approachScroll } = useScroll({
    target: approachRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  const { scrollYProgress: visionScroll } = useScroll({
    target: visionRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  const { scrollYProgress: expertiseScroll } = useScroll({
    target: expertiseRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  const { scrollYProgress: creationScroll } = useScroll({
    target: creationRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  const { scrollYProgress: complementaryScroll } = useScroll({
    target: complementaryRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  // Transforms linked to scroll
  const approachOpacity = useTransform(approachScroll, [0, 0.8], [0, 1]);
  const approachY = useTransform(approachScroll, [0, 1], [isMobile ? 30 : 50, 0]);

  const visionOpacity = useTransform(visionScroll, [0, 0.8], [0, 1]);
  const visionY = useTransform(visionScroll, [0, 1], [isMobile ? 40 : 100, 0]);

  const expertiseTitleOpacity = useTransform(expertiseScroll, [0, 0.3], [0, 1]);
  const expertiseTitleX = useTransform(expertiseScroll, [0, 0.4], [isMobile ? -20 : -50, 0]);

  const creationTitleOpacity = useTransform(creationScroll, [0, 0.3], [0, 1]);
  const creationTitleY = useTransform(creationScroll, [0, 0.4], [isMobile ? 40 : 100, 0]);
  const creationTitleScale = useTransform(creationScroll, [0, 0.4], [0.8, 1]);

  const complementaryTitleOpacity = useTransform(complementaryScroll, [0, 0.3], [0, 1]);
  const complementaryTitleX = useTransform(complementaryScroll, [0, 0.4], [isMobile ? 40 : 100, 0]);
  const complementaryTitleSkew = useTransform(complementaryScroll, [0, 0.4], [isMobile ? 5 : 10, 0]);

  const mainExpertises = [
    { 
      title: "Site Vitrine", 
      desc: "L'élégance au service de votre image de marque. Une présence digitale épurée et efficace.", 
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "Site E-commerce", 
      desc: "Transformez vos visiteurs en clients. Une boutique en ligne performante et sécurisée.", 
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "Site Template", 
      desc: "La rapidité sans compromis sur le style. Une structure solide pour un lancement immédiat.", 
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "Solution Métier", 
      desc: "Un outil sur mesure pour vos besoins spécifiques. Plus qu'un site, un levier de croissance.", 
      img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const complementaryServices = [
    { title: "SEO", icon: <Layers className="w-4 h-4" /> },
    { title: "Création de Logo", icon: <Zap className="w-4 h-4" /> },
    { title: "Hébergement", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Stratégie Digitale", icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Agence Web Annecy | Création de Sites Web & SEO | Novaris</title>
        <meta name="description" content="Agence web Annecy : Experts en création de sites internet et SEO. Propulsez votre business avec une agence de création de site web performante." />
        <meta name="keywords" content="agence web annecy, création site internet annecy, agence de création de site web, création de sites web, seo annecy" />
        <link rel="canonical" href="https://novaris-studio.com/" />
        <meta property="og:title" content="Agence Web Annecy | Création de Sites & SEO sur-mesure" />
        <meta property="og:description" content="Votre agence web à Annecy pour la création de sites internet performants et l'optimisation SEO." />
        <meta property="og:url" content="https://novaris-studio.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Novaris - Agence Web Annecy",
              "url": "https://novaris-studio.com/",
              "logo": "https://novaris-studio.com/logo.png",
              "description": "Agence web spécialisée en création de sites internet et SEO à Annecy.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Annecy",
                "addressRegion": "Haute-Savoie",
                "postalCode": "74000",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.8992",
                "longitude": "6.1294"
              },
              "priceRange": "$$",
              "service": [
                "Création de site web",
                "SEO",
                "Référencement naturel",
                "Développement web sur-mesure",
                "E-commerce"
              ]
            }
          `}
        </script>
      </Helmet>
      <div ref={containerRef} className="w-full relative z-10 px-6 md:px-20 lg:px-40" onMouseMove={handleMouseMove}>
      {/* Background Yellow Highlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[100vh]">
        <motion.div 
          style={{ 
            x: useTransform(mouseXSpring, (v: number) => v * -1.2), 
            y: useTransform(mouseYSpring, (v: number) => v * -1.2) 
          }}
          className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-yellow-500/10 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ 
            x: useTransform(mouseXSpring, (v: number) => v * 0.8), 
            y: useTransform(mouseYSpring, (v: number) => v * 0.8) 
          }}
          className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-yellow-400/5 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[20%] w-[20vw] h-[20vw] bg-yellow-300/10 blur-[100px] rounded-full"
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex flex-col justify-center pt-32 pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
            <span className="font-mono text-[8px] md:text-[10px] px-3 py-1.5 border border-white/10 text-zinc-400 uppercase tracking-widest bg-white/5">
              [ NOVARIS // DISPONIBILITÉ LOCALE ]
            </span>
          </div>
          
          <motion.h1 
            ref={titleRef}
            className="hero-title mb-8 lg:mb-12 cursor-default relative overflow-visible group/title"
            style={{ x: mouseXSpring, y: mouseYSpring }}
            onMouseEnter={() => !isMobile && setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
          >
            {/* Desktop Mouse Glow Effect */}
            <AnimatePresence>
              {isTitleHovered && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute pointer-events-none z-0"
                  style={{
                    left: titleGlowX,
                    top: titleGlowY,
                    x: '-50%',
                    y: '-50%',
                  }}
                >
                  <div className="w-32 h-32 bg-[#D000FF] blur-[70px] rounded-full opacity-60" />
                  <div className="w-8 h-8 bg-white blur-[20px] rounded-full opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            <span className="relative z-10 block leading-tight tracking-tight lg:text-8xl md:text-7xl text-5xl font-medium">
              AGENCE WEB <br/>
              <motion.span 
                className="text-outline font-black"
                style={{ x: useTransform(mouseXSpring, (v: number) => v * -0.5), y: useTransform(mouseYSpring, (v: number) => v * -0.5) }}
              >
                ANNECY.
              </motion.span>
            </span>
          </motion.h1>

          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
              Agence web basée à Annecy, nous accompagnons les professionnels dans la création d'expériences digitales qui ont du sens. 
            </p>
          </div>
        </motion.div>
      </section>

      {/* Human / Excellence Section */}
      <section ref={approachRef} className="py-24 border-t border-white/5">
        <motion.div 
          style={{ opacity: approachOpacity, y: approachY }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="font-mono text-xs text-accent uppercase tracking-[0.4em]">#DigitalExcellence</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">AGENCE WEB ANNECY <br/>CRÉATION DE SITES.</h2>
            </div>
            
            <div className="space-y-8">
              <motion.div className="flex gap-4 items-start">
                <div className="w-1 h-1 bg-accent mt-2.5 shrink-0" />
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  Chez Novaris, nous croyons que l'humain est derrière <br className="hidden md:block" /> chaque ligne de code.
                </p>
              </motion.div>
              
              <div className="flex gap-4 items-start">
                <div className="w-1 h-1 bg-accent mt-2.5 shrink-0" />
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  Notre travail parle pour nous, sans besoin <br className="hidden md:block" /> de grands discours inutiles.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1 h-1 bg-accent mt-2.5 shrink-0" />
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  Nous sommes un partenaire engagé qui prend <br className="hidden md:block" /> le temps de comprendre votre histoire.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1 h-1 bg-accent mt-2.5 shrink-0" />
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  Une écoute active pour traduire votre univers <br className="hidden md:block" /> en une expérience authentique.
                </p>
              </div>
            </div>

            <div className="flex gap-6 pt-8">
              <Link to="/agence" className="group flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase bg-white text-black px-8 py-4 rounded-full hover:bg-accent transition-colors">
                En savoir plus <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="group flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase border border-white/20 px-8 py-4 rounded-full hover:border-white transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-12 lg:mt-0">
             <div className="w-full max-w-[320px] lg:max-w-none min-h-[500px] lg:aspect-[4/5] border border-white/5 relative flex items-center justify-center bg-zinc-950/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="relative z-10 flex flex-col items-center py-12">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="mb-12 lg:mb-16"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, y: 100, rotate: 0 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 45 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="w-24 h-24 border-2 border-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    >
                      <div className="w-5 h-5 bg-white"></div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-center px-10"
                  >
                    <div className="font-mono text-[10px] text-zinc-600 mb-6 tracking-[0.5em] uppercase">Architecture Digitale</div>
                    <p className="text-xl md:text-2xl font-bold text-white/80 tracking-tight leading-snug italic max-w-xs mx-auto">
                      "Faites de votre site votre meilleur commercial"
                    </p>
                    <div className="mt-12 flex justify-center gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-[1px] bg-white/10" />
                      ))}
                    </div>
                  </motion.div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="py-32 border-t border-white/5 bg-white/[0.01]">
        <motion.div 
          style={{ opacity: visionOpacity, y: visionY }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <div className="space-y-6">
            <div className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] text-center">[ NOTRE VISION ]</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-center">CRÉER DU SENS <br/>DANS LE DIGITAL.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-[1px] bg-white/20 mt-3 shrink-0" />
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    Un site n'est pas qu'une simple vitrine ; <br />c'est le cœur de votre communication.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-[1px] bg-white/20 mt-3 shrink-0" />
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    Il doit refléter votre professionnalisme <br />en installant une confiance immédiate.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-[1px] bg-white/20 mt-3 shrink-0" />
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    Nous privilégions la clarté et l'efficacité <br />pour que votre message soit compris.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-[1px] bg-white/20 mt-3 shrink-0" />
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    Une présence digitale pérenne qui <br />accompagne votre croissance réelle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Link to="/contact" className="inline-block px-12 py-6 border border-white text-xs font-mono uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
              Démarrer une réflexion
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Nos Expertises Interactiv Section */}
      <section ref={expertiseRef} className="py-24 border-t border-white/5 relative bg-zinc-950">
        <motion.div 
          style={{ opacity: expertiseTitleOpacity, x: expertiseTitleX }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">#TRANSFORMATION</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">NOS <br /><span className="text-outline">EXPERTISES.</span></h2>
        </motion.div>

        <div className="relative">
          {/* Desktop Navigation Arrows - Flanking */}
          <button 
            onClick={() => setExpertiseIndex((prev) => (prev > 0 ? prev - 1 : mainExpertises.length - 1))}
            className="hidden md:flex absolute -left-12 lg:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 items-center justify-center hover:bg-white hover:text-black transition-all z-30"
            aria-label="Previous"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <div className="relative border border-white/5 bg-black overflow-hidden mb-8 lg:mb-0">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="aspect-video md:aspect-[21/9] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={expertiseIndex}
                  initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="text-center px-10"
                >
                  <span className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic text-white/90">
                    {mainExpertises[expertiseIndex].title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Index Counter */}
            <div className="absolute top-10 right-10 font-mono text-[10px] text-zinc-500 tracking-[0.3em]">
              {expertiseIndex + 1} / {mainExpertises.length}
            </div>
          </div>

          <button 
            onClick={() => setExpertiseIndex((prev) => (prev < mainExpertises.length - 1 ? prev + 1 : 0))}
            className="hidden md:flex absolute -right-12 lg:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 items-center justify-center hover:bg-white hover:text-black transition-all z-30 group overflow-visible"
            aria-label="Next"
          >
            {/* External Pulse (Outside) */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none rounded-sm"
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(59, 130, 246, 0)',
                  '0 0 30px rgba(59, 130, 246, 0.8)',
                  '0 0 0px rgba(59, 130, 246, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
            {/* Internal Pulse (Inside) */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              animate={{ 
                boxShadow: [
                  'inset 0 0 0px rgba(59, 130, 246, 0)',
                  'inset 0 0 20px rgba(59, 130, 246, 0.7)',
                  'inset 0 0 0px rgba(59, 130, 246, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-500/20"
                animate={{ 
                  opacity: [0, 0.4, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div
              animate={{ 
                color: ['#ffffff', '#60a5fa', '#ffffff'],
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </button>
        </div>

        {/* CTA Buttons Block */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/agence" className="group">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="h-16 md:h-20 border border-white/10 bg-zinc-950 flex items-center justify-center relative overflow-hidden transition-all hover:border-blue-500/50"
            >
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity blur-[80px]" />
              <div className="relative z-10 flex items-center gap-4">
                <span className="text-sm md:text-base font-black uppercase tracking-tighter group-hover:text-blue-400 transition-colors">En savoir plus</span>
                <ChevronRight className="w-4 h-4 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          </Link>

          <Link to="/contact" className="group">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="h-16 md:h-20 border border-white/10 bg-zinc-950 flex items-center justify-center relative overflow-hidden transition-all hover:border-blue-500/50"
            >
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-15 transition-opacity blur-[80px]" />
              <div className="relative z-10 flex items-center gap-4">
                <span className="text-sm md:text-base font-black uppercase tracking-tighter group-hover:text-blue-400 transition-colors">Nous contacter</span>
                <ChevronRight className="w-4 h-4 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Services Complémentaires Section */}
      <section ref={complementaryRef} className="py-24 border-t border-white/5 bg-zinc-950/30">
        <motion.div 
          style={{ 
            opacity: complementaryTitleOpacity, 
            x: complementaryTitleX,
            skewX: complementaryTitleSkew 
          }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">#PLUS_LOIN</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">SERVICES <br /><span className="text-outline">COMPLÉMENTAIRES.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "SEO & Référencement", desc: "Optimisation pour les moteurs de recherche pour une visibilité maximale.", icon: <Activity className="w-6 h-6" /> },
            { title: "Création de Logo", desc: "Identité visuelle unique et mémorable pour votre marque.", icon: <Layers className="w-6 h-6" /> },
            { title: "Hébergement Pro", desc: "Serveurs ultra-rapides et sécurisés pour une performance sans faille.", icon: <ShieldCheck className="w-6 h-6" /> },
            { title: "Stratégie Digitale", desc: "Accompagnement stratégique pour booster votre croissance en ligne.", icon: <Zap className="w-6 h-6" /> }
          ].map((service, idx) => (
            <Link to="/contact" key={idx} className="block group">
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  transition: { duration: 0.3 }
                }}
                className="relative p-8 border border-white/5 bg-zinc-900/50 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all duration-300 flex flex-col gap-6 h-full overflow-hidden"
              >
                {/* Subtle blue glow light behind */}
                <div className="absolute -inset-10 bg-blue-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="text-zinc-500 group-hover:text-blue-500 transition-colors relative z-10">
                  {service.icon}
                </div>
                
                <div className="space-y-3 relative z-10">
                  <h3 className="text-lg font-bold tracking-tight uppercase group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{service.desc}</p>
                </div>
  
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                  <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest group-hover:text-blue-500/50 transition-colors">Service _{idx + 1}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Expertises Section with Squares */}
      <section ref={creationRef} className="py-24 border-t border-white/5">
        <motion.div 
          style={{ 
            opacity: creationTitleOpacity, 
            y: creationTitleY,
            scale: creationTitleScale
          }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">#CONCEPTION_WEB</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">CRÉATION <br /><span className="text-outline">DE SITES WEB.</span></h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainExpertises.map((item, i) => (
            <div key={i} className="group relative">
              {/* Background Blue Glow on Hover */}
              <div className="absolute inset-0 bg-blue-600/20 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
              
              <Link to="/contact" className="relative aspect-square border border-white/10 overflow-hidden bg-zinc-900 block transition-all duration-500 group-hover:border-blue-500/30">
                <img src={item.img} alt={`Création de site web Annecy - ${item.title}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 grayscale" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="font-mono text-[10px] text-zinc-500 italic">0{i+1}</div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed h-0 group-hover:h-16 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {item.desc}
                    </p>
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                      <ChevronRight className="w-5 h-5 text-white group-hover:text-black" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Complementary Services Section */}
      <section className="py-24 border-t border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Services Complémentaires</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Au-delà de la conception, nous vous apportons les briques essentielles pour une présence digitale complète et pérenne.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-white/5 pl-0 lg:pl-10">
             {complementaryServices.map((service, i) => (
                <div key={i} className="group relative">
                  {/* Subtle yellow glow behind */}
                  <div className="absolute inset-0 bg-yellow-500/5 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-start gap-4 p-6 border border-white/5 hover:border-yellow-500/30 hover:bg-yellow-500/[0.02] transition-all duration-300">
                    <div className="mt-1 text-zinc-600 group-hover:text-yellow-500 transition-colors">{service.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase mb-2 tracking-widest group-hover:text-white transition-colors">{service.title}</h4>
                      <div className="w-4 h-[1px] bg-white/20 group-hover:bg-yellow-500/50 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

