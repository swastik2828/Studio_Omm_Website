import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Sparkles, 
  Mic2, 
  SlidersHorizontal, 
  MonitorPlay, 
  Aperture, 
  Radio, 
  Cpu, 
  Waves, 
  Headphones 
} from 'lucide-react';
import SEO from '../components/SEO';

// --- DATA ---
const workflowSteps = [
  { step: '01', title: 'Discovery & Concept', desc: 'We align with your vision, understand your brand identity, and draft the initial creative blueprint.' },
  { step: '02', title: 'Pre-Production', desc: 'Scripting, storyboarding, casting voice talent, and finalizing the production schedule.' },
  { step: '03', title: 'Studio Production', desc: 'Recording, shooting, and capturing the raw essence using industry-leading equipment.' },
  { step: '04', title: 'Post & Mastering', desc: 'Editing, color grading, sound design, and final mastering for broadcast-ready quality.' },
];

const equipmentList = [
  { icon: Mic2, label: 'Neumann & Telefunken Mics', desc: 'Pristine vocal and instrument capture.' },
  { icon: SlidersHorizontal, label: 'Analog Outboard Gear', desc: 'Warmth and punch via SSL & Neve.' },
  { icon: Waves, label: 'Dolby Atmos Setup', desc: 'Immersive 3D spatial audio mixing.' },
  { icon: MonitorPlay, label: 'Genelec Smart Monitors', desc: 'Flawless acoustic representation.' },
  { icon: Aperture, label: 'RED Digital Cinema', desc: '8K resolution for ultimate visual fidelity.' },
  { icon: Cpu, label: 'UAD Interfaces', desc: 'Zero-latency recording and DSP processing.' },
  { icon: Radio, label: 'Treated Isolation Booths', desc: 'Acoustically deadened for pure sound.' },
  { icon: Headphones, label: 'Focal Reference Audio', desc: 'Critical listening and micro-adjustments.' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      <SEO 
        title="About Us" 
        description="Learn about Studio OMM's journey, our state-of-the-art equipment, and our expert production team."
        keywords="about studio omm, recording studio history, professional production team"
      />
      {/* 1. HERO & STUDIO STORY */}
      <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-secondary"
        >
          Our Story
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-8"
        >
          The <span className="text-transparent bg-clip-text bg-gradient-primary">Studio</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-textSecondary max-w-4xl mx-auto leading-relaxed"
        >
          Founded on the principle that uncompromising quality shouldn't be an afterthought, 
          Studio OMM Srimayee is an independent creative powerhouse. We blend high-end technology 
          with artistic intuition to craft audio and visual experiences that demand attention and leave a lasting impact.
        </motion.p>
      </section>

      {/* 2. MISSION, VISION & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <Target size={40} className="text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-textSecondary leading-relaxed">
              To empower brands, artists, and creators by delivering uncompromising audio-visual fidelity. We translate your raw ideas into polished, broadcast-ready masterpieces.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-secondary/50 transition-colors duration-500"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
            <Eye size={40} className="text-secondary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-textSecondary leading-relaxed">
              To be the definitive creative hub where storytelling meets state-of-the-art technology, setting new industry benchmarks for production excellence.
            </p>
          </motion.div>

          {/* Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-surface p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-accent/50 transition-colors duration-500"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all"></div>
            <Sparkles size={40} className="text-accent mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
            <p className="text-textSecondary leading-relaxed">
              We believe every detail matters. From the subtlest breath in a voice-over to the final color grade of a commercial, perfection is our baseline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. SCROLLING TIMELINE WORKFLOW */}
      <section className="mb-32 relative bg-surface/30 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Creative <span className="text-transparent bg-clip-text bg-gradient-primary">Workflow</span></h2>
          <p className="text-textSecondary text-lg">How we bring your ideas to life.</p>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative" ref={timelineRef}>
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"></div>
          
          {workflowSteps.map((item, i) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center gap-8 mb-20 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Text Side */}
              <div className={`flex-1 w-full text-center ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{item.title}</h3>
                <p className="text-textSecondary leading-relaxed">{item.desc}</p>
              </div>
              
              {/* Node */}
              <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xl font-display font-bold text-white relative z-10 shadow-[0_0_30px_rgba(124,58,237,0.4)] group">
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                {item.step}
              </div>
              
              {/* Spacer */}
              <div className="flex-1 w-full hidden md:block"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. PREMIUM EQUIPMENT ARSENAL */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-transparent bg-clip-text bg-gradient-primary">Arsenal</span></h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            World-class productions require world-class gear. We utilize industry-standard equipment to ensure uncompromised fidelity.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {equipmentList.map((gear, i) => {
            const Icon = gear.icon;
            return (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-surface p-8 rounded-3xl border border-white/5 flex flex-col items-start gap-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
              >
                <div className="w-14 h-14 rounded-2xl bg-card border border-white/5 flex items-center justify-center text-white mb-2 shadow-lg shadow-black/50">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{gear.label}</h4>
                  <p className="text-sm text-textSecondary leading-relaxed">{gear.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      
    </div>
  );
}