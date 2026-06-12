import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
  const [terminalText, setTerminalText] = useState("");
  const prompt = "mohammed-jagda@portfolio:~$ ";
  const command = "cat developer.json";
  
  useEffect(() => {
    const jsonResponse = `{
  "name": "Jagda Mohammed Irfan",
  "role": "Software Developer Intern",
  "location": "Mumbai, India",
  "technologies": [
    "MERN Stack", "Python", 
    "FastAPI", "Redis Caching"
  ],
  "interests": ["Scalability", "AI/ML", "Web3"]
}`;

    let index = 0;
    let currentText = prompt;
    setTerminalText(currentText);

    // Typing command animation
    const typeCommand = () => {
      if (index < command.length) {
        currentText += command.charAt(index);
        setTerminalText(currentText);
        index++;
        setTimeout(typeCommand, 80);
      } else {
        // Output JSON after a small delay
        setTimeout(() => {
          setTerminalText(currentText + "\n" + jsonResponse + "\n" + prompt);
        }, 300);
      }
    };

    const startTimeout = setTimeout(typeCommand, 600);
    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div className="hero-content">
          <span className="hero-subtitle">WELCOME TO MY PORTFOLIO</span>
          <h1>Hi, I'm <span className="highlight-text">Mohammed Jagda</span></h1>
          <p>
            A Full-Stack Developer and Hackathon Enthusiast passionate about building smart, secure, and scalable applications.
            I specialize in React, Next.js, Node.js, Python, and AI integration.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">Explore My Projects</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>

        <div className="hero-terminal-container">
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="terminal-title">mohammed-jagda — bash</span>
            </div>
            <div className="terminal-body">
              <pre>
                {terminalText}
                <span className="cursor">█</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
