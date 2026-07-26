import React, { useState } from 'react';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgress from './components/effects/ScrollProgress';
import FilmGrain from './components/effects/FilmGrain';
import SmoothScroll from './components/layout/SmoothScroll';
import CommandPalette from './components/ui/CommandPalette';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import AIPlayground from './components/AIPlayground';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Global effects */}
      <CustomCursor />
      <ScrollProgress />
      <FilmGrain />

      {/* UI Overlays */}
      <Preloader />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Navbar onOpenCommandPalette={() => setCmdOpen(true)} />

      {/* Page */}
      <main>
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <AIPlayground />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

export default App;
