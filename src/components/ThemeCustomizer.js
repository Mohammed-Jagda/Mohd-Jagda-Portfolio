import React, { useState } from 'react';
import { FaPalette, FaTimes } from 'react-icons/fa';
import './ThemeCustomizer.css';

const themes = [
  {
    name: "Cyber Purple",
    color: "#a855f7",
    vars: {
      "--accent-purple": "#a855f7",
      "--accent-indigo": "#6366f1",
      "--gradient-purple": "linear-gradient(135deg, #a855f7, #6366f1)",
      "--glow-shadow": "0 0 20px rgba(168, 85, 247, 0.15)"
    }
  },
  {
    name: "Neon Cyan",
    color: "#06b6d4",
    vars: {
      "--accent-purple": "#06b6d4",
      "--accent-indigo": "#3b82f6",
      "--gradient-purple": "linear-gradient(135deg, #06b6d4, #3b82f6)",
      "--glow-shadow": "0 0 20px rgba(6, 182, 212, 0.2)"
    }
  },
  {
    name: "Forest Green",
    color: "#10b981",
    vars: {
      "--accent-purple": "#10b981",
      "--accent-indigo": "#84cc16",
      "--gradient-purple": "linear-gradient(135deg, #10b981, #84cc16)",
      "--glow-shadow": "0 0 20px rgba(16, 185, 129, 0.2)"
    }
  },
  {
    name: "Sunset Rose",
    color: "#f43f5e",
    vars: {
      "--accent-purple": "#f43f5e",
      "--accent-indigo": "#fb7185",
      "--gradient-purple": "linear-gradient(135deg, #f43f5e, #fb7185)",
      "--glow-shadow": "0 0 20px rgba(244, 63, 94, 0.2)"
    }
  }
];

function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Cyber Purple");

  const applyTheme = (theme) => {
    setActiveTheme(theme.name);
    Object.entries(theme.vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  };

  return (
    <div className={`theme-customizer ${isOpen ? 'open' : ''}`}>
      <button 
        className="customizer-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Customizer"
      >
        {isOpen ? <FaTimes /> : <FaPalette />}
      </button>

      <div className="customizer-panel">
        <h4>ACCENT GLOW</h4>
        <div className="theme-options">
          {themes.map((theme, idx) => (
            <button
              key={idx}
              className={`theme-option-btn ${activeTheme === theme.name ? 'active' : ''}`}
              style={{ '--theme-color': theme.color }}
              onClick={() => applyTheme(theme)}
              title={theme.name}
            >
              <span className="color-bubble"></span>
              <span className="theme-label">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeCustomizer;
