import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const categories = ['All', 'Audio', 'Video', 'Podcast', 'Commercial'];

const projects = [
  { id: 1, title: 'Echoes of the Valley', category: 'Audio', type: 'Audio Drama' },
  { id: 2, title: 'Neon Nights Ad', category: 'Commercial', type: 'TV Spot' },
  { id: 3, title: 'The Founders Club', category: 'Podcast', type: 'Video Podcast' },
  { id: 4, title: 'Urban Symphony', category: 'Video', type: 'Music Video' },
  { id: 5, title: 'TechNova Rebrand', category: 'Commercial', type: 'Radio Ad' },
  { id: 6, title: 'Midnight Jazz Sessions', category: 'Audio', type: 'Album Mix' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">The <span className="text-transparent bg-clip-text bg-gradient-primary">Archive</span></h1>
          <p className="text-textSecondary text-lg max-w-md">Explore our curated selection of recent production work.</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat 
                  ? 'bg-white text-background' 
                  : 'bg-surface border border-white/5 hover:border-white/20 text-textSecondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-card cursor-pointer border border-white/5"
            >
              {/* Premium Dark Placeholder (to be replaced by actual images) */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-background transition-transform duration-700 group-hover:scale-105"></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                  <Play className="text-white fill-white ml-1" />
                </div>
              </div>

              {/* Text Info */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/80 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">{project.type}</span>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}