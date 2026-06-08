import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Leadership from './components/Leadership';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ThemeCustomizer from './components/ThemeCustomizer';

function App() {
  return (
    <div className="app-container">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Hackathons />
      <Leadership />
      <Gallery />
      <Contact />
      <ThemeCustomizer />
    </div>
  );
}

export default App;
