import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Updated Helper: Now also catches /shorts/ and ensures robust ID extraction
const getYouTubeID = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const categories = ['All', 'Audio', 'Video', 'Podcast', 'Commercial'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolios'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(176,38,255,0.5)]"></div>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => {
              const videoId = getYouTubeID(project.youtubeLink);
              // CHANGED: Using hqdefault.jpg as the primary source - it is guaranteed to exist
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={() => setActiveVideo(videoId)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-card cursor-pointer border border-white/5 shadow-lg"
                >
                  {thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { 
                        // Ultimate fallback if even HQ fails
                        e.target.onerror = null; 
                        e.target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`; 
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface to-background transition-transform duration-700 group-hover:scale-105"></div>
                  )}
                  
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_40px_rgba(176,38,255,0.8)]">
                      <Play className="text-white fill-white ml-1 w-8 h-8" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block drop-shadow-lg">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">{project.title}</h3>
                  </div>
                </motion.div>
              );
            })}
            
            {filteredProjects.length === 0 && (
              <p className="col-span-full text-center text-textSecondary py-20">No projects found in this category.</p>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg p-4"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 bg-surface border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all z-50"
            >
              <X size={28} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(176,38,255,0.2)] border border-white/10 relative"
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}