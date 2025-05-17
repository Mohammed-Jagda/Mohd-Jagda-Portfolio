import React from 'react';
import './Navbar.css';
import { FaUser, FaProjectDiagram, FaCode, FaEnvelope } from 'react-icons/fa';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src="/profile.png" alt="Profile" className="navbar-photo" />
        <div className="brand-text">
          <h1 className="navbar-title">Mohammed Jagda</h1>
          <p className="navbar-subtitle">Creating with Passion | Delivering Value</p>
        </div>
      </div>

      <nav className="navbar-nav">
        <a href="#about" className="nav-link">
          <span className="nav-icon-text">
            <FaUser className="nav-icon" />
            About
          </span>
        </a>
        <a href="#projects" className="nav-link">
          <span className="nav-icon-text">
            <FaProjectDiagram className="nav-icon" />
            Projects
          </span>
        </a>
        <a href="#hackathons" className="nav-link">
          <span className="nav-icon-text">
            <FaCode className="nav-icon" />
            Hackathons
          </span>
        </a>
        <a href="#contact" className="nav-link">
          <span className="nav-icon-text">
            <FaEnvelope className="nav-icon" />
            Contact
          </span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
