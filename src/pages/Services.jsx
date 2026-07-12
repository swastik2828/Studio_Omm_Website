import { motion } from 'framer-motion';
// FIXED: Swapped 'Youtube' for 'MonitorPlay' to prevent Vite module errors
import { Mic, Video, Radio, Music, MonitorPlay, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const services = [
  { icon: Mic, title: 'Music Production', desc: 'Premium quality audio recording, beat creation, mixing, and mastering for independent artists and labels.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
  { icon: Music, title: 'Song Production', desc: 'End-to-end songwriting, composition, and vocal arrangement to bring your musical vision to life.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
  { icon: Video, title: 'Video Editing', desc: 'Cinematic video post-production, color grading, and commercial editing for ads and music videos.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
  { icon: Radio, title: 'News Broadcasting', desc: 'Professional live and recorded broadcast setups tailored for news agencies and digital journalism.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
  { icon: MonitorPlay, title: 'YouTube Management', desc: 'Comprehensive channel growth, SEO optimization, and content management for creators and brands.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
  { icon: Edit3, title: 'Advertisement Studio', desc: 'High-impact commercial audio and video production designed to capture attention and elevate your brand.', color: 'group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SEO 
        title="Our Services" 
        description="Explore our top-tier services including Music Production, Video Editing, News Broadcasting, and YouTube Management."
        keywords="video editing, youtube management, song production, news broadcasting"
      />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-primary font-bold tracking-widest uppercase">
          Premium Production
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-primary">Arsenal</span></h1>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">Comprehensive production solutions engineered for absolute fidelity. We bring the equipment, the space, and the expertise.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div key={i} variants={item} className={`group bg-surface p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 ${svc.color} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{svc.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-8">{svc.desc}</p>
              
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-textSecondary group-hover:text-primary transition-colors">
                Book Service <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}