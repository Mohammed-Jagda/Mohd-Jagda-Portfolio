import React, { useState, useEffect } from 'react';
import './About.css';
import { FaDownload, FaMapMarkerAlt, FaEnvelope, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

function About() {
  const API_URL = process.env.REACT_APP_API_URL || '';
  const [resumeUrl, setResumeUrl] = useState(process.env.PUBLIC_URL + '/MohdJagdaResume.pdf?v=2');
  useEffect(() => {
    const checkBackendResume = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const response = await fetch(`${API_URL}/api/health`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          setResumeUrl(`${API_URL}/uploads/MohdJagdaResume.pdf?v=${Date.now()}`);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        // Fallback to static public PDF
      }
    };
    checkBackendResume();
  }, [API_URL]);

  return (
    <section className="about-section" id="about">
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="about-left">
          <p>
            I am a high-impact MERN Stack & AI Engineer with hands-on production experience building enterprise-grade platforms serving thousands of users. I specialize in architecting scalable MERN systems, integrating AI/ML pipelines, and leading cross-functional initiatives — from hackathon strategy to product delivery.
          </p>
          <p>
            Adept at operating with a startup mindset: shipping fast, iterating faster, and owning outcomes end-to-end. I bring rare depth across the engineering stack alongside demonstrated organizational leadership, making me immediately valuable as an individual contributor or team lead.
          </p>

          <div className="btn-wrapper">
            <a
              href={resumeUrl}
              download
              className="btn-download"
            >
              <FaDownload style={{ marginRight: '8px' }} /> Download CV
            </a>
          </div>
        </div>

        <div className="about-right">
          <div className="info-card">
            <div className="info-item">
              <span className="info-icon"><FaBriefcase /></span>
              <div>
                <h4>Current Role</h4>
                <p>Software Developer</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaGraduationCap /></span>
              <div>
                <h4>Education</h4>
                <p>M.H. Saboo Siddik College of Engineering</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaMapMarkerAlt /></span>
              <div>
                <h4>Location</h4>
                <p>Mumbai, India</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaEnvelope /></span>
              <div>
                <h4>Email</h4>
                <p>mohammedjagda601@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
