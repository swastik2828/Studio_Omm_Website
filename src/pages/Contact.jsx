import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

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
      // Connect to Firestore Collection 'contact_messages'
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setStatus('success');
      setFormData({ name: '', phone: '', requirement: '', message: '' });

      // Reset form status after 5 seconds
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's <span className="text-transparent bg-clip-text bg-gradient-primary">Connect</span></h1>
        <p className="text-lg text-textSecondary max-w-xl mx-auto">Ready to start your next project? Drop us a message and our lead producer will get back to you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Info */}
        {/* Left Column: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-surface p-8 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white relative z-10">Studio OMM Srimayee</h3>
            
            <div className="flex items-center gap-4 text-textSecondary relative z-10">
              <Phone className="text-secondary shrink-0" />
              <p>Contact: +91 63712 13298</p>
            </div>

            <div className="flex items-center gap-4 text-textSecondary relative z-10">
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-secondary shrink-0 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
              </svg>
              <p>WhatsApp: +91 94375 56043</p>
            </div>
            
            <div className="flex items-center gap-4 text-textSecondary relative z-10">
              <Mail className="text-secondary shrink-0" />
              <p>ommsrimayee@gmail.com</p>
            </div>

            <div className="flex items-start gap-4 text-textSecondary relative z-10">
              {/* YouTube Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-secondary mt-1 shrink-0 fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <p>YouTube: OMM SRIMAYEE PRESENTS</p>
            </div>
          </div>
          
          {/* Neon Glow Map Placeholder */}
          <div className="w-full h-64 bg-card rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-background/50 z-10 transition-opacity group-hover:opacity-0"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <p className="relative z-20 text-textSecondary font-medium group-hover:text-white transition-colors duration-500">Studio OMM Srimayee</p>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-surface p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center relative z-10"
                >
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(57,255,20,0.4)]">
                    <CheckCircle className="text-success w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-textSecondary">Our producers will reach out shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6 relative z-10" 
                  onSubmit={handleSubmit}
                >
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
                      <option value="audio">Audio Production</option>
                      <option value="video">Video Commercial</option>
                      <option value="podcast">Podcast Recording</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary ml-1">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-accent text-sm text-center">Something went wrong. Please try again.</p>
                  )}

                  <motion.button 
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 mt-4 bg-gradient-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.7)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="animate-spin" size={20} /> Transmitting...</>
                    ) : (
                      'Send Message'
                    )}
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