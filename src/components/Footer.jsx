import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface/80 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Vibrant Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-primary"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Link to="/" className="text-3xl font-bold text-white tracking-tighter block mb-6">
            STUDIO<span className="text-transparent bg-clip-text bg-gradient-primary">OMM</span>
          </Link>
          <p className="text-textSecondary text-sm leading-relaxed mb-6">
            The premier hub for high-fidelity music production, cinematic video editing, and broadcast-grade news media.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Navigation</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-textSecondary hover:text-accent transition-colors text-sm">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Our Expertise</h4>
          <ul className="space-y-4">
            <li className="text-textSecondary text-sm hover:text-secondary transition-colors cursor-pointer">Music Production</li>
            <li className="text-textSecondary text-sm hover:text-secondary transition-colors cursor-pointer">Video Editing</li>
            <li className="text-textSecondary text-sm hover:text-secondary transition-colors cursor-pointer">News Broadcasting</li>
            <li className="text-textSecondary text-sm hover:text-secondary transition-colors cursor-pointer">YouTube Management</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Studio Location</h4>
          <ul className="space-y-4 text-sm text-textSecondary">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-1 shrink-0" />
              <span>Studio OMM Srimayee, Back Side of Banadevi Temple, Kabisurjya Nagar, Odisha</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <Phone size={16} className="text-secondary shrink-0" />
              <a href="tel:+916371213298">+91 63712 13298</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <Mail size={16} className="text-accent shrink-0" />
              <a href="mailto:ommsrimayee@gmail.com">ommsrimayee@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textSecondary relative z-10">
        <p>Developed with ❤️ by <a href="https://github.com/swastik2828" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Swastik Singh</a></p>
        <p>&copy; {new Date().getFullYear()} Studio OMM Srimayee. All rights reserved. </p>
        <div className="flex gap-6">
          {/* <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link> */}
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}