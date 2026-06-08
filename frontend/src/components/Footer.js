import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-socials">
        <a 
          href="https://instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-btn instagram"
          title="Instagram"
        >
          <FaInstagram />
        </a>
        <a 
          href="https://x.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-btn x"
          title="X (formerly Twitter)"
        >
          <FaTwitter />
        </a>
        <a 
          href="https://www.linkedin.com/in/mohammed-jagda-abb421222" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-btn linkedin"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
      <div className="footer-copyright">
        <p>© {currentYear} All Rights Reserved - Mohammed Jagda</p>
      </div>
    </footer>
  );
}

export default Footer;
