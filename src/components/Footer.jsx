import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/30 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-display font-bold tracking-tighter">
            Studio <span className="text-transparent bg-clip-text bg-gradient-primary">OMM</span> Srimayee
          </Link>
          <p className="text-sm text-textSecondary mt-2">Where Every Sound Tells a Story.</p>
        </div>
        
        <div className="text-sm text-textSecondary flex gap-6">
          <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-textSecondary/60">
        © {new Date().getFullYear()} Studio OMM Srimayee. All rights reserved.
      </div>
    </footer>
  );
}