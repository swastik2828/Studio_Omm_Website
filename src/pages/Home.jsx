import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Mic, Video, Radio, ShieldCheck, Zap, Trophy, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// IMPORT THE 3D HERO COMPONENT HERE
import Hero3D from '../components/Hero3D';

// -----------------------------
// MICRO-COMPONENTS
// -----------------------------

const AudioEqualizer = () => (
  <div className="flex items-end gap-[3px] h-6 opacity-90">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 bg-gradient-primary rounded-t-full"
        animate={{ height: ['20%', '100%', '30%', '90%', '20%'] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
      />
    ))}
  </div>
);

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const TrustMarquee = () => {
  const brands = ["SONY MUSIC", "•", "NETFLIX", "•", "SPOTIFY", "•", "UNIVERSAL", "•", "HBO", "•"];
  return (
    <div className="w-full overflow-hidden bg-surface/50 border-y border-white/5 py-8 flex">
      <motion.div 
        className="flex gap-12 whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...brands, ...brands, ...brands].map((word, i) => (
          <span key={i} className={`text-2xl md:text-4xl font-display font-bold tracking-widest ${word === '•' ? 'text-primary opacity-50' : 'text-white/20'}`}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// -----------------------------
// MAIN HOME PAGE COMPONENT
// -----------------------------

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative bg-background overflow-hidden">
      
      {/* --- SECTION 1: INTERACTIVE 3D HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Imported 3D Canvas Background */}
        <Hero3D />

        {/* HTML UI Layered Over the 3D Canvas */}
        <motion.div style={{ opacity: opacityHero }} className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10 pointer-events-none mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(176,38,255,0.2)] pointer-events-auto"
          >
            <AudioEqualizer />
            <span className="text-sm font-medium tracking-widest uppercase text-white">Dimension Unlocked</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 max-w-5xl leading-[1.1] drop-shadow-2xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-block mr-4 text-white">Sonic</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block mr-4 text-white">Perfection,</motion.span>
            <br className="hidden md:block" />
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-block mr-4 text-white">Visual</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="inline-block text-transparent bg-clip-text bg-gradient-primary drop-shadow-[0_0_30px_rgba(176,38,255,0.8)]">Dominance.</motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 drop-shadow-lg"
          >
            We engineer premium audio and cinematic visuals that cut through the noise. Scale your brand with industry-leading production.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
            <Link to="/portfolio" className="group relative px-10 py-5 bg-white text-background rounded-full font-bold hover:scale-105 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors">Enter Portfolio</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 2: TRUST INDICATORS --- */}
      <section className="relative z-20 bg-background">
        <div className="text-center mb-6 text-sm font-bold tracking-widest text-textSecondary uppercase pt-10">Trusted by industry leaders</div>
        <TrustMarquee />
      </section>

      {/* --- SECTION 3: THE STUDIO ADVANTAGE (3D CARDS) --- */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">The <span className="text-secondary">Unfair Advantage</span></h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">Why top agencies and independent creators choose Studio OMM for their flagship projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TiltCard className="h-full">
              <div className="bg-surface/80 backdrop-blur-sm p-10 rounded-3xl border border-white/10 h-full shadow-[0_0_30px_rgba(176,38,255,0.05)]">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/50 text-primary">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Rapid Turnaround</h3>
                <p className="text-textSecondary leading-relaxed">Our optimized workflow and dedicated render farms mean you get broadcast-ready files faster than traditional studios.</p>
              </div>
            </TiltCard>

            <TiltCard className="h-full">
              <div className="bg-surface/80 backdrop-blur-sm p-10 rounded-3xl border border-white/10 h-full shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-8 border border-secondary/50 text-secondary">
                  <Trophy size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Commercial Fidelity</h3>
                <p className="text-textSecondary leading-relaxed">We mix to strict streaming and broadcast loudness standards (LUFS), ensuring your ad or track sounds massive on any device.</p>
              </div>
            </TiltCard>

            <TiltCard className="h-full">
              <div className="bg-surface/80 backdrop-blur-sm p-10 rounded-3xl border border-white/10 h-full shadow-[0_0_30px_rgba(255,0,127,0.05)]">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-8 border border-accent/50 text-accent">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">NDA Protected</h3>
                <p className="text-textSecondary leading-relaxed">Absolute discretion. We handle pre-release tracks and sensitive corporate commercials with military-grade file security.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CORE CAPABILITIES --- */}
      <section className="py-24 relative bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Core <span className="text-primary italic">Capabilities</span></h2>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Link to="/services" className="group flex items-center gap-3 text-lg font-medium text-textPrimary hover:text-primary transition-colors">
                View All Services 
                <span className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all shadow-[0_0_15px_rgba(176,38,255,0.3)]">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mic, title: "Audio Advertisements", color: "primary", glow: "hover:shadow-[0_0_40px_rgba(176,38,255,0.3)]" },
              { icon: Video, title: "Video & Jingle Ads", color: "secondary", glow: "hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]" },
              { icon: Radio, title: "Podcast & Radio Ads", color: "accent", glow: "hover:shadow-[0_0_40px_rgba(255,0,127,0.3)]" }
            ].map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className={`group bg-background p-10 rounded-[2rem] border border-white/10 hover:-translate-y-2 transition-all duration-500 ${svc.glow}`}
              >
                <div className={`w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-${svc.color} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                  <svc.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>
                <p className="text-textSecondary leading-relaxed">End-to-end production in a state-of-the-art environment engineered for absolute fidelity.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TESTIMONIALS --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-secondary/10 rounded-[100%] blur-[100px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">The <span className="text-accent">Verdict</span></h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">Don't just take our word for it. Here is what industry professionals have to say.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Studio OMM completely elevated our brand's audio identity. The final mix for our TV spot was punchy, clear, and delivered 2 days ahead of schedule.", name: "Sarah Jenkins", role: "Creative Director" },
              { quote: "The best vocal tracking experience I've had. The room sounds incredible, and the engineer's ear for detail saved our project.", name: "Marcus Reed", role: "Independent Artist" },
              { quote: "Their video team understood our vision immediately. The cinematic quality and color grading exceeded anything we've done internally.", name: "David Chen", role: "Marketing VP" }
            ].map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-surface/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative hover:border-white/20 transition-colors"
              >
                <div className="flex gap-1 text-accent mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-current" />)}
                </div>
                <p className="text-white text-lg leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-textSecondary">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: MASSIVE CONVERSION CTA --- */}
      <section className="py-32 relative border-t border-white/5 bg-gradient-to-b from-background to-surface">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to hit <span className="text-transparent bg-clip-text bg-gradient-primary">Record?</span></h2>
            <p className="text-xl text-textSecondary mb-12 max-w-2xl mx-auto">Stop compromising on your creative vision. Connect with our lead producer today via WhatsApp for an immediate consultation.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://wa.me/919437556043" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-success text-background rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)]"
              >
                <MessageCircle className="fill-current" size={24} />
                Chat on WhatsApp
              </a>
              
              <Link 
                to="/contact" 
                className="px-10 py-5 rounded-full font-bold text-lg border-2 border-white/10 hover:border-primary text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
              >
                Use Contact Form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}