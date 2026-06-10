import React, { useState } from 'react';
import './Navbar.css';
import { FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">
          <img
            src={process.env.PUBLIC_URL + '/profile.png'}
            alt="Profile"
            className="navbar-photo"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsModalOpen(true)}
          />
          <div className="brand-text">
            <h1 className="navbar-title">Mohammed Jagda</h1>
            <p className="navbar-subtitle">Creating with Passion | Delivering Value</p>
          </div>
        </div>

        {/* Hamburger Menu Toggle Button */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon-text">
              <FaUser className="nav-icon" />
              About
            </span>
          </a>
          <a href="#experience" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon-text">
              <FaBriefcase className="nav-icon" />
              Experience
            </span>
          </a>
          <a href="#projects" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon-text">
              <FaProjectDiagram className="nav-icon" />
              Projects
            </span>
          </a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon-text">
              <FaEnvelope className="nav-icon" />
              Contact
            </span>
          </a>
        </nav>
      </header>

      {isModalOpen && (
        <div
          className="modal"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/profile.png'}
            alt="Profile Large"
            style={{ maxHeight: '80%', maxWidth: '80%', borderRadius: '16px', boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
