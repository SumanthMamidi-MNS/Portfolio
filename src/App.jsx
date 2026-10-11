import React, { useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
import { PreloaderProvider } from './context/PreloaderContext';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgress from './components/effects/ScrollProgress';
import SmoothScroll from './components/layout/SmoothScroll';
import CommandPalette from './components/ui/CommandPalette';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const closeCmd = useCallback(() => setCmdOpen(false), []);
  const toggleCmd = useCallback(() => setCmdOpen((open) => !open), []);

  return (
    // reducedMotion="user": every Framer Motion animation respects the visitor's OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <PreloaderProvider>
        <SmoothScroll>
          {/* Global: custom cursor (desktop pointers only) and the thin scroll-progress bar */}
          <CustomCursor />
          <ScrollProgress />

          {/* UI Overlays */}
          <Preloader />
          <CommandPalette open={cmdOpen} onClose={closeCmd} onToggle={toggleCmd} />
          <Navbar onOpenCommandPalette={() => setCmdOpen(true)} />

          {/* Page: who I am (hero + about) → proof (projects, paper) → context */}
          <main>
            <Hero />
            <About />
            <Projects />
            <Publications />
            <Education />
            <Skills />
            <Certifications />
            <Contact />
          </main>

          <Footer />
        </SmoothScroll>
      </PreloaderProvider>
    </MotionConfig>
  );
}

export default App;
