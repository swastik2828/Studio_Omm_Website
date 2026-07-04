import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Trash2, Plus, MessageSquare, Video, LogOut } from 'lucide-react';

// Hard-coded credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function Admin() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  
  const [messages, setMessages] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  
  const [newProject, setNewProject] = useState({ title: '', category: 'Video', youtubeLink: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAuth(true);
      fetchMessages();
      fetchPortfolios();
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'portfolios'));
      setPortfolios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.youtubeLink) return;
    try {
      await addDoc(collection(db, 'portfolios'), newProject);
      setNewProject({ title: '', category: 'Video', youtubeLink: '' });
      fetchPortfolios();
    } catch (error) {
      console.error('Error adding portfolio:', error);
    }
  };

  const handleDeletePortfolio = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'portfolios', id));
        fetchPortfolios();
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="bg-surface p-10 rounded-3xl border border-white/5 w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Admin Access</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <button type="submit" className="bg-gradient-primary text-white font-bold py-4 rounded-xl mt-2 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] transition-all">Secure Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold">Admin <span className="text-transparent bg-clip-text bg-gradient-primary">Dashboard</span></h1>
        <button onClick={() => setIsAuth(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-white/5 hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all"><LogOut size={18} /> Logout</button>
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('messages')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === 'messages' ? 'bg-primary text-white' : 'bg-surface text-textSecondary hover:text-white border border-white/5'}`}><MessageSquare size={20}/> Form Responses</button>
        <button onClick={() => setActiveTab('portfolio')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === 'portfolio' ? 'bg-secondary text-background' : 'bg-surface text-textSecondary hover:text-white border border-white/5'}`}><Video size={20}/> Manage Portfolio</button>
      </div>

      {activeTab === 'messages' && (
        <div className="bg-surface p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-bold mb-6">Latest Inquiries</h2>
          <div className="grid gap-6">
            {messages.length === 0 ? <p className="text-textSecondary">No messages found.</p> : messages.map(msg => (
              <div key={msg.id} className="bg-background/80 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                  <h3 className="font-bold text-xl text-white">{msg.name}</h3>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-wide">{msg.requirement}</span>
                </div>
                <p className="text-secondary font-medium mb-4">Phone: {msg.phone}</p>
                <div className="bg-surface p-4 rounded-xl text-textSecondary leading-relaxed border border-white/5">
                  "{msg.message}"
                </div>
                <p className="text-xs text-textSecondary/50 mt-4 text-right">{msg.createdAt?.toDate().toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-surface p-8 rounded-3xl border border-white/5 h-fit sticky top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Video size={24} className="text-secondary"/> Add New Video</h2>
            <form onSubmit={handleAddPortfolio} className="flex flex-col gap-4">
              <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required className="bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary" />
              <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none appearance-none [&>option]:bg-card cursor-pointer">
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
                <option value="Podcast">Podcast</option>
                <option value="Commercial">Commercial</option>
              </select>
              <input type="url" placeholder="YouTube URL" value={newProject.youtubeLink} onChange={e => setNewProject({...newProject, youtubeLink: e.target.value})} required className="bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary" />
              <button type="submit" className="bg-secondary text-background font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"><Plus size={20}/> Publish Project</button>
            </form>
          </div>
          
          <div className="lg:col-span-2 bg-surface p-8 rounded-3xl border border-white/5">
            <h2 className="text-xl font-bold mb-6 text-white">Live Portfolio Items</h2>
            <div className="space-y-4">
              {portfolios.length === 0 ? <p className="text-textSecondary">No portfolio items added yet.</p> : portfolios.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-background/80 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                    <div className="flex items-center gap-3 text-sm mt-2">
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded border border-secondary/20">{item.category}</span>
                      <a href={item.youtubeLink} target="_blank" rel="noreferrer" className="text-textSecondary hover:text-white underline transition-colors">Test Link</a>
                    </div>
                  </div>
                  <button onClick={() => handleDeletePortfolio(item.id)} className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-sm"><Trash2 size={20}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}