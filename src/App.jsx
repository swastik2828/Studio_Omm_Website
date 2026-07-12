import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// 1. Make sure SEO is imported here
import SEO from './components/SEO'; 
import MainLayout from './layouts/MainLayout';
import Preloader from './components/Preloader';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // 2. The "Nuclear Option": Force the document title via standard JavaScript
  // This guarantees the title changes even if Helmet fails to mount instantly.
  useEffect(() => {
    document.title = "Studio OMM | Premium Music & Advertisement";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 3. Global Fallback SEO: This mounts instantly before the preloader finishes */}
      <SEO 
        title="Loading" 
        description="Premium Music & Advertisement Studio" 
        keywords="studio, music, advertisement" 
      />

      <BrowserRouter>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader key="preloader" />
          ) : (
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}