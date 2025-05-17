import React, { useState } from 'react';
import './Navbar.css';
import { FaUser, FaProjectDiagram, FaCode, FaEnvelope } from 'react-icons/fa';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {isModalOpen && (
        <div
          className="modal"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/profile.png'}
            alt="Profile Large"
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '8px' }}
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
