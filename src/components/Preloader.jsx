import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated Equalizer */}
        <div className="flex items-end gap-1.5 h-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-primary rounded-t-full"
              animate={{ height: ['20%', '100%', '30%', '90%', '20%'] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        {/* Brand Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl font-display font-bold tracking-[0.2em] uppercase text-textSecondary"
        >
          Studio <span className="text-transparent bg-clip-text bg-gradient-primary">OMM</span> Srimayee
        </motion.div>
      </div>
    </motion.div>
  );
}