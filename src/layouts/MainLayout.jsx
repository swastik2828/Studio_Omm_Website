import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet /> {/* This is where the specific page content renders */}
      </main>
      
      <Footer />
      
      {/* The WhatsApp button is placed here so it floats globally on all pages */}
      <FloatingWhatsApp />
    </div>
  );
}