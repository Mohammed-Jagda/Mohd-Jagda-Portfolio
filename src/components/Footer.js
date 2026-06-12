import React from 'react';
import './Footer.css';
import { FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-socials">
        <a
          href="https://www.instagram.com/mohammed_jagda?igsh=MTNlbnZyZjl2dnRpYg=="
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn instagram"
          title="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com/mohammed_jagda"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn x"
          title="X (formerly Twitter)"
        >
          <FaXTwitter />
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
