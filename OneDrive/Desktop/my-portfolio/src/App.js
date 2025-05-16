import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Leadership from './components/Leadership';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Hackathons />
      <Leadership />
      <Contact />
    </>
  );
}

export default App;
