import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Eye, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const introRef = useRef(null);
  const expertiseRef = useRef(null);
  const philosophyRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress: introScroll } = useScroll({
    target: introRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: expertiseScroll } = useScroll({
    target: expertiseRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "center center"]
  });

  const { scrollYProgress: philosophyScroll } = useScroll({
    target: philosophyRef,
    offset: isMobile ? ["start 95%", "start 30%"] : ["start end", "end start"]
  });

  // Intro Transforms - Only apply on desktop to avoid disappearing too fast on mobile
  const introOpacityDesktop = useTransform(introScroll, [0, 0.5], [1, 0]);
  const introYDesktop = useTransform(introScroll, [0, 0.5], [0, -50]);
  const introScaleDesktop = useTransform(introScroll, [0, 0.5], [1, 0.95]);

  // Handle transformations based on device
  const introOpacity = isMobile ? 1 : introOpacityDesktop;
  const introY = isMobile ? 0 : introYDesktop;
  const introScale = isMobile ? 1 : introScaleDesktop;

  // Expertise Transforms
  const expertiseTitleOpacity = useTransform(expertiseScroll, [0, 0.3], [0, 1]);
  const expertiseTitleX = useTransform(expertiseScroll, [0, 0.4], [isMobile ? -30 : -100, 0]);
  
  // Philosophy Transforms
  const imageY = useTransform(philosophyScroll, [0, 1], ["0%", "20%"]);
  const philosophyScale = useTransform(philosophyScroll, [0, 0.5], [0.8, 1]);

  // GSAP Scroll Pinning
  const stickyRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // Initial states
      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0, scale: 0.8 });
      gsap.set(sweepRef.current, { x: "-100%", opacity: 0 });

      // Animation sequence
      tl.to(word1Ref.current, { opacity: 1, scale: 1, duration: 1 })
        .to(word1Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "+=0.5")
        
        // Light Sweep 1 (Fluorescent)
        .to(sweepRef.current, { opacity: 0.8, duration: 0.2 })
        .to(sweepRef.current, { x: "100%", duration: 1.5, ease: "power2.inOut" }, "<")
        .to(word2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<0.4")
        .to(sweepRef.current, { opacity: 0, duration: 0.3 }, ">-0.5")
        
        .to(word2Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "+=0.5")
        
        // Reset and Light Sweep 2
        .set(sweepRef.current, { x: "-100%" })
        .to(sweepRef.current, { opacity: 0.8, duration: 0.2 })
        .to(sweepRef.current, { x: "100%", duration: 1.5, ease: "power2.inOut" }, "<")
        .to(word3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<0.4")
        .to(sweepRef.current, { opacity: 0, duration: 0.3 }, ">-0.5");
    });

    return () => ctx.revert();
  }, []);

  const servicesDetail = [
    {
      title: "Site Vitrine",
      desc: "Nous concevons des outils numériques qui vous ressemblent. Pas de superflu, juste de l'efficacité et de l'esthétique pour porter votre image au plus haut niveau.",
      tag: "IMAGE DE MARQUE"
    },
    {
      title: "Site E-commerce",
      desc: "Vendre en ligne demande une structure robuste. Nous développons des boutiques fluides, optimisées pour la conversion et la sécurité de vos transactions.",
      tag: "VENTE EN LIGNE"
    },
    {
      title: "Solutions Métier",
      desc: "Parfois, un site classique ne suffit pas. Nous créons des interfaces sur mesure pour répondre à vos problématiques spécifiques de gestion ou de service.",
      tag: "DÉVELOPPEMENT"
    }
  ];

  const expertises = [
    { 
      icon: <Target className="w-5 h-5" />, 
      title: "Optimisation SEO", 
      desc: "Être présent c'est bien, être trouvé c'est mieux. Nous travaillons votre visibilité naturelle avec rigueur pour attirer une audience qualifiée."
    },
    { 
      icon: <Eye className="w-5 h-5" />, 
      title: "Identité Visuelle", 
      desc: "Création de logos et chartes graphiques qui marquent les esprits et assoient votre crédibilité dès le premier regard."
    },
    { 
      icon: <Shield className="w-5 h-5" />, 
      title: "Hébergement & Suivi", 
      desc: "Un accompagnement réel et direct. Nous devenons le partenaire technique de votre croissance sur le long terme, avec une maintenance proactive."
    }
  ];

  return (
    <>
      <Helmet>
        <title>L'Agence de Création de Site Web Annecy | Novaris Studio SEO</title>
        <meta name="description" content="L'agence de création de site web à Annecy. Performance technique, SEO et expertise digitale pour vos sites internet sur-mesure." />
        <meta name="keywords" content="agence web annecy, agence de création de site web, création de sites web, seo annecy" />
        <link rel="canonical" href="https://novaris-studio.com/agence" />
        <meta property="og:title" content="Novaris | Agence Web et Création de Sites à Annecy" />
        <meta property="og:description" content="Plus qu'une agence web, Novaris est votre partenaire de création de sites web et SEO à Annecy." />
        <meta property="og:url" content="https://novaris-studio.com/agence" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://novaris-studio.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "L'Agence Web",
                "item": "https://novaris-studio.com/agence"
              }]
            }
          `}
        </script>
      </Helmet>
      <div className="w-full relative z-10 px-6 md:px-20 lg:px-40 pb-32">
      {/* Introduction */}
      <section ref={introRef} className="pt-40 pb-20">
        <motion.div
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] mb-12"
          >
            [ L'AGENCE NOVARIS ]
          </motion.div>
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12 leading-none"
            >
              CRÉATION DE SITE <br />
              <span className="text-outline">WEB SUR-MESURE.</span>
            </motion.h1>
            <p className="text-2xl md:text-4xl font-light text-zinc-300 leading-tight">
              Novaris est une structure à <span className="text-white font-black italic">taille humaine</span>, créative, passionnée et surtout, à l'écoute de votre histoire.
            </p>
            <div className="h-[1px] w-12 bg-accent" />
            <div className="text-sm md:text-base text-zinc-500 leading-relaxed font-light space-y-6 text-justify">
              <p>
                Chez Novaris, nous croyons qu'une rencontre réelle est le point de départ de tout grand projet. Nous ne nous contentons pas de produire du code ; nous imaginons des solutions sur mesure qui font converger vos idées avec une touche d'audace. 
              </p>
              <p>
                Agence web basée à Annecy, nous accompagnons les professionnels dans chaque étape de leur transformation numérique. La proximité n'est pas qu'un mot pour nous, c'est le socle de notre réactivité et de notre engagement. Ici, pas d'intermédiaires, une communication directe pour un résultat qui vous ressemble vraiment.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
               <Link to="/contact" className="px-8 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-accent transition-colors">
                  Démarrer un projet
               </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Notre Mission */}
      <section className="py-24 border-t border-white/5">
        <h2 className="text-sm font-mono text-zinc-500 mb-16 tracking-[0.5em] uppercase">NOTRE MISSION :</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {servicesDetail.map((service, i) => (
            <div key={i} className="p-10 hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
              {/* Red Glow Effect on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/15 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              
              <div className="font-mono text-[9px] text-accent mb-6 tracking-widest">{service.tag}</div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform">{service.title}</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertises Grid */}
      <section ref={expertiseRef} className="py-24 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <motion.div
              style={{ opacity: expertiseTitleOpacity, x: expertiseTitleX }}
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">EXPERT SEO & <br /><span className="text-outline">CRÉATION WEB.</span></h3>
              <p className="text-zinc-500 font-light leading-relaxed">
                Parce que votre projet mérite une attention particulière, nous déployons un panel de services complémentaires pour garantir la pérennité et la performance de votre écosystème digital.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {expertises.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 shrink-0 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-sm tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            ref={philosophyRef}
            style={{ scale: philosophyScale }}
            className="relative border border-white/5 min-h-[400px] flex flex-col justify-between overflow-hidden group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                style={{ y: imageY }}
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
                alt="Agence Web Annecy - Expertise et Design Digital" 
                className="w-full h-[120%] object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 p-12 flex flex-col h-full justify-end">
              <div className="space-y-6">
                <p className="text-2xl font-light italic text-white leading-relaxed">
                  "Technology is just a tool, the importance is to be aware of the human who uses it to build your vision."
                </p>
                <div className="h-[1px] w-8 bg-accent" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Philosophie Novaris</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Word Sequence Section - Real Scroll Pinning with GSAP */}
      <section 
        ref={stickyRef} 
        className="h-screen relative flex flex-col items-center justify-center overflow-hidden bg-black z-20 border border-white/5"
      >
        {/* Fluorescent Light Sweep Overlay */}
        <div 
          ref={sweepRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #ff0000 20%, #0000ff 50%, #8b00ff 80%, transparent 100%)',
            filter: 'blur(120px)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Backdrop text for texture */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none z-0">
           <span className="text-[40vw] font-black uppercase leading-none tracking-tighter text-white">NOVARIS</span>
        </div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center relative">
            <h2 
              ref={word1Ref}
              className="absolute text-5xl sm:text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-center leading-[0.8] w-full"
            >
              Designers
            </h2>
            <h2 
              ref={word2Ref}
              className="absolute text-4xl sm:text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-center leading-[0.85] px-4 w-full"
            >
              Développeurs <br className="md:hidden" /> Web
            </h2>
            <h2 
              ref={word3Ref}
              className="absolute text-3xl sm:text-5xl md:text-[7vw] font-black uppercase tracking-tighter text-center leading-[0.85] px-4 w-full"
            >
              Stratégie <br className="md:hidden" /> Sur mesure
            </h2>
          </div>
        </div>
      </section>

      {/* Final Reveal Section - Unblocked Scroll */}
      <section className="py-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] mb-8"
          >
            [ VOTRE SUCCÈS ]
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16 leading-none"
          >
            Soyez serein, <br />
            <span className="text-outline">NovaRis est là</span> <br />
            pour votre visibilité.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left border-t border-white/5 pt-16">
            {[
              { id: "01", title: "Proximité & Écoute", desc: "Un interlocuteur unique basé à Annecy pour une compréhension totale de vos enjeux métier." },
              { id: "02", title: "Haute Performance", desc: "Vitesse de chargement fulgurante et infrastructure solide pour une expérience utilisateur sans faille." },
              { id: "03", title: "SEO & Visibilité", desc: "Optimisation structurelle native pour que vous soyez trouvé par ceux qui vous cherchent." },
              { id: "04", title: "Suivi Rigoureux", desc: "Nous ne livrons pas qu'un site, nous livrons un partenariat durable pour votre croissance numérique." }
            ].map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 5 }}
                className="group relative space-y-3 p-6 -m-6 rounded-xl transition-all duration-300 overflow-hidden"
              >
                {/* Yellow Glow Hover Background */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-500 pointer-events-none" />
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent/0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="font-mono text-[10px] text-accent font-bold mb-1 group-hover:scale-110 origin-left transition-transform duration-300">{item.id}.</div>
                  <h4 className="font-bold uppercase text-xs tracking-widest text-white group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20">
            <Link to="/contact">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-accent transition-all inline-block group cursor-pointer shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_rgba(24acc,0.3)]"
              >
                <span className="flex items-center gap-4">
                  Convertir ma vision en réalité
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                </span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
