import { motion } from 'motion/react';
import { Mail, MessageSquare, Phone, Send, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/xvzdvglz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setError("Une erreur est survenue lors de l'envoi.");
        }
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Agence Web Annecy | Devis Création Site Internet & SEO</title>
        <meta name="description" content="Devis création site internet et SEO à Annecy. Contactez votre agence web pour lancer un projet digital ultra-performant." />
        <meta name="keywords" content="contact agence web annecy, devis création site internet, agence de création de site web, création de sites web annecy, seo annecy" />
        <link rel="canonical" href="https://novaris-studio.com/contact" />
        <meta property="og:title" content="Devis Création Site Web Annecy | Contactez Novaris" />
        <meta property="og:description" content="Prêt pour votre création de site web ou SEO à Annecy ? Contactez notre agence web dès aujourd'hui." />
        <meta property="og:url" content="https://novaris-studio.com/contact" />
      </Helmet>
      <div className="pt-24 md:pt-40 pb-24 px-6 md:px-20 lg:px-40 max-w-7xl relative z-10 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-[10px] md:text-xs text-accent mb-6 tracking-[0.5em] uppercase">[ NOVARIS // CONTACT PROTOCOLE ]</div>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
                DEVIS <br />
                <span className="text-outline">SITE WEB.</span>
              </h1>
            </div>
            
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-16 max-w-md">
              Définir votre ambition. Votre demande est analysée avec soin sous <span className="text-white font-bold">24 heures ouvrées</span>.
            </p>
          </motion.div>

          {/* Availability Status */}
          <div className="mb-16 p-8 border border-white/5 bg-white/[0.02] inline-block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Statut : Disponible pour nouveaux projets</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase">Prochaine fenêtre de déploiement : Juin 2026</div>
          </div>

          <div className="space-y-10">
            {[
              { icon: <Mail className="w-5 h-5" />, label: "EMAIL DIRECT", value: "Novaris.studio@yahoo.com", sub: "Général & Presse", hoverColor: "group-hover:bg-blue-500/20 group-hover:border-blue-400/30" },
              { icon: <Phone className="w-5 h-5" />, label: "LIGNE DIRECTE", value: "+33 458 630 047", sub: "Lun-Ven, 9h-18h", hoverColor: "group-hover:bg-purple-500/20 group-hover:border-purple-400/30" },
              { icon: <MapPin className="w-5 h-5" />, label: "SIÈGE SOCIAL", value: "Annecy, Haute-Savoie", sub: "Bureaux de Production", hoverColor: "group-hover:bg-accent/20 group-hover:border-accent/30", isYellow: true }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group p-4 -m-4 rounded-xl transition-all duration-500 relative overflow-hidden">
                {/* Visual glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 ${item.isYellow ? 'bg-accent/5' : 'bg-white/[0.02]'}`} />
                
                <div className={`shrink-0 w-12 h-12 border border-white/10 flex items-center justify-center transition-all duration-300 ${item.hoverColor} group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-[9px] font-mono text-zinc-500 mb-1 tracking-widest uppercase group-hover:text-zinc-400 transition-colors">{item.label}</div>
                  <div className={`text-xl font-black uppercase tracking-tight mb-1 transition-colors ${item.isYellow ? 'group-hover:text-accent' : 'group-hover:text-white'}`}>{item.value}</div>
                  <div className="text-[10px] text-zinc-600 uppercase font-mono group-hover:text-zinc-500 transition-colors">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5">
            <div className="font-mono text-[10px] text-zinc-600 uppercase mb-8 tracking-widest">NAVIGATION NOVARIS :</div>
            <div className="flex flex-wrap gap-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
               <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
               <Link to="/agence" className="hover:text-accent transition-colors">L'Agence</Link>
               <Link to="/contact" className="text-white">Contact</Link>
            </div>
          </div>
        </div>

        <motion.div
          id="briefing-form"
          ref={formRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="border border-white/5 p-10 md:p-16 bg-white/[0.01] backdrop-blur-xl relative z-10">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 border border-accent flex items-center justify-center mb-8 rotate-45 mx-auto">
                  <Send className="w-8 h-8 text-accent -rotate-45" />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Transmission Réussie.</h3>
                <p className="text-zinc-500 font-light max-w-xs mx-auto">Un architecte digital analyse votre message. Réponse sous 24h.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-12 text-[9px] font-mono text-white border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-all uppercase tracking-[0.3em]"
                >
                  Nouveau Message
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="mb-12">
                  <div className="font-mono text-[10px] text-accent mb-4 tracking-[0.5em] uppercase">[ BRIEFING PROJET ]</div>
                  <div className="relative inline-block px-8 py-4 bg-red-600/90 backdrop-blur-md border border-red-500/50 shadow-[0_0_40px_rgba(220,38,38,0.25)]">
                    {/* Soft red glow light - focused on ambition */}
                    <div className="absolute -inset-10 bg-red-600/25 blur-[60px] rounded-full -z-10 animate-pulse pointer-events-none" />
                    <h2 className="text-3xl md:text-4xl font-black mb-0 tracking-tighter uppercase leading-none text-white">
                      DÉFINIR VOTRE <br />AMBITION.
                    </h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="group space-y-4">
                    <label className="text-[10px] font-mono text-white tracking-widest uppercase">Identité // 01</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white py-4 focus:border-accent outline-none transition-all font-light text-xl placeholder:text-zinc-700"
                      placeholder="VOTRE NOM OU VOTRE ENTREPRISE"
                    />
                  </div>
                  
                  <div className="group space-y-4">
                    <label className="text-[10px] font-mono text-white tracking-widest uppercase">Canal de retour // 02</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white py-4 focus:border-accent outline-none transition-all font-light text-xl placeholder:text-zinc-700"
                      placeholder="VOTRE EMAIL PROFESSIONNEL"
                    />
                  </div>

                  <div className="group space-y-4">
                    <label className="text-[10px] font-mono text-white tracking-widest uppercase">Vision // 03</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-transparent border-b border-white py-4 focus:border-accent outline-none transition-all font-medium text-white text-xl resize-none placeholder:text-zinc-700"
                      placeholder="DÉCRIVEZ VOTRE AMBITION, VOS OBJECTIFS ET VOS ÉCHÉANCES..."
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 font-mono text-[9px] uppercase tracking-widest">
                      SYSTEM ERROR : {error}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-8 border border-white overflow-hidden flex items-center justify-center transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                  >
                    <span className="relative z-10 font-black text-xs tracking-[0.5em] uppercase">
                      {isSubmitting ? 'TRANSMISSION...' : 'ENVOYER LE BRIEF'}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center text-black font-black text-xs tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">Lancer l'Analyse</span>
                  </button>
                </form>
              </div>
            )}
          </div>
          
          {/* Abstract background decorative element */}
          <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] opacity-40 animate-pulse" />
        </motion.div>
      </div>
      
      {/* Footer Quote */}
      <section className="mt-40 pt-32 pb-20 border-t border-white/5 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative px-6"
        >
          {/* Parallax Background Text */}
          <motion.div 
            whileInView={{ x: [20, -20] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 10, ease: "linear" }}
            className="font-black text-[15vw] opacity-[0.03] absolute inset-0 flex items-center justify-center select-none pointer-events-none uppercase tracking-tighter"
          >
            PERFECTION
          </motion.div>

          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-zinc-400 max-w-4xl mx-auto leading-relaxed relative z-10 transition-all duration-700 group-hover:text-white font-light">
            <span className="text-accent group-hover:text-white transition-colors duration-500 mr-2 opacity-50 block mb-6 text-6xl">“</span>
            La perfection est atteinte, non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il <span className="text-white border-b-2 border-accent/30 group-hover:border-accent transition-all duration-500 pb-1">n'y a plus rien à retirer</span>.
          </p>
          
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-accent/20" />
            <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.5em] group-hover:text-accent group-hover:tracking-[0.6em] transition-all duration-500">
              — Antoine de Saint-Exupéry
            </div>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
