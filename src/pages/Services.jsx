import { motion } from 'framer-motion';
import { Mic, Video, Radio, Music, Waves, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Mic, title: 'Audio Advertisements', desc: 'High-impact audio commercials designed to capture attention and elevate your brand.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(176,38,255,0.2)]' },
  { icon: Video, title: 'Video & Jingle Advertisements', desc: 'Cinematic commercial production and catchy jingles tailored for your campaigns.', color: 'group-hover:border-secondary/50 group-hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]' },
  { icon: Headphones, title: 'Voice Over Services', desc: 'Professional voice acting for corporate, narrative, and character work.', color: 'group-hover:border-accent/50 group-hover:shadow-[0_0_30px_-5px_rgba(255,0,127,0.2)]' },
  { icon: Music, title: 'Background Music & Beats', desc: 'Custom background scores and premium beats crafted perfectly to your narrative.', color: 'group-hover:border-success/50 group-hover:shadow-[0_0_30px_-5px_rgba(57,255,20,0.2)]' },
  { icon: Waves, title: 'Song Mixing & Mastering', desc: 'Give your tracks width, depth, and punch to meet modern streaming standards.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(176,38,255,0.2)]' },
  { icon: Radio, title: 'Podcast & Radio Ads Production', desc: 'End-to-end production for podcasts and radio broadcasts in our treated studios.', color: 'group-hover:border-secondary/50 group-hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-secondary font-bold tracking-widest uppercase">
          All Types of Advertise Done Here
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-primary">Arsenal</span></h1>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">Comprehensive production solutions engineered for absolute fidelity. We bring the equipment, the space, and the expertise.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div 
              key={i} 
              variants={item}
              className={`group bg-surface p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 ${svc.color} relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{svc.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-8">{svc.desc}</p>
              
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-primary transition-colors">
                Book Service <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}