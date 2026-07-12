import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.requirement || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus('submitting');

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setStatus('success');
      
      // 2. Format WhatsApp Message and Redirect
      const waNumber = "919437556043";
      const text = `Hello Studio OMM, my name is ${formData.name}.%0A%0APhone: ${formData.phone}%0AProject Type: ${formData.requirement}%0A%0AMessage: ${formData.message}`;
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;
      
      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');

      setFormData({ name: '', phone: '', requirement: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Studio OMM for your music, video, or broadcasting needs."
        keywords="contact music studio, hire video editor, book recording session"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's <span className="text-transparent bg-clip-text bg-gradient-primary">Connect</span></h1>
        <p className="text-lg text-textSecondary max-w-xl mx-auto">Ready to start your next project? Drop us a message and our lead producer will get back to you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
          <div className="bg-surface p-8 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
            <h3 className="text-2xl font-bold mb-8 text-white relative z-10">Studio OMM Srimayee</h3>
            
            <div className="flex items-center gap-4 text-textSecondary relative z-10 hover:text-secondary transition-colors">
              <Phone className="text-secondary shrink-0" />
              <p>Contact: +91 63712 13298</p>
            </div>

            <div className="flex items-center gap-4 text-textSecondary relative z-10 hover:text-secondary transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-secondary shrink-0 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/></svg>
              <p>WhatsApp: +91 94375 56043</p>
            </div>
            
            <div className="flex items-center gap-4 text-textSecondary relative z-10 hover:text-secondary transition-colors">
              <Mail className="text-secondary shrink-0" />
              <p>ommsrimayee@gmail.com</p>
            </div>

            {/* ADDED INSTAGRAM LINK */}
            {/* FIXED INSTAGRAM LINK */}
<a href="https://www.instagram.com/studioommsrimayee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-textSecondary relative z-10 hover:text-primary transition-colors cursor-pointer group">
  <svg viewBox="0 0 24 24" width="24" height="24" className="text-secondary shrink-0 fill-current group-hover:text-primary transition-colors"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  <p>Follow us on Instagram</p>
</a>

            <div className="flex items-start gap-4 text-textSecondary relative z-10 hover:text-accent transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-secondary mt-1 shrink-0 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <p>YouTube: OMM SRIMAYEE PRESENTS</p>
            </div>
          </div>
          
          <div className="relative w-full h-64 overflow-hidden rounded-3xl border border-white/5 bg-card group">
            <iframe title="Studio OMM Srimayee location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.9938505788828!2d84.75371067396563!3d19.584764135806285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a22b3e4880e14ad%3A0xf1afd1b3169f278d!2sSTUDIO%20OMM%20SRIMAYEE!5e0!3m2!1sen!2sin!4v1783791780326!5m2!1sen!2sin" className="absolute inset-0 h-full w-full border-0" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10"><p className="text-sm font-medium text-white">Studio OMM Srimayee</p></div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="bg-surface p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center justify-center h-full min-h-[400px] text-center relative z-10">
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(57,255,20,0.4)]"><CheckCircle className="text-success w-10 h-10" /></div>
                  <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-textSecondary">Redirecting to WhatsApp...</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary ml-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary ml-1">Requirement</label>
                    <select name="requirement" value={formData.requirement} onChange={handleChange} required className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all appearance-none cursor-pointer [&>option]:bg-card">
                      <option value="">Select a service...</option>
                      <option value="News Broadcasting">News Broadcasting</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Music Production">Music Production</option>
                      <option value="YouTube Management">YouTube Management</option>
                      <option value="Song Production">Song Production and Creation</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary ml-1">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>

                  {status === 'error' && <p className="text-accent text-sm text-center">Something went wrong. Please try again.</p>}

                  <motion.button disabled={status === 'submitting'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 mt-4 bg-gradient-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.7)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {status === 'submitting' ? <><Loader2 className="animate-spin" size={20} /> Transmitting...</> : 'Submit & Chat on WhatsApp'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}