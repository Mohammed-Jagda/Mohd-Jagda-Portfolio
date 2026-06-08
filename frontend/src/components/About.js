import React, { useState, useEffect } from 'react';
import './About.css';
import { FaDownload, FaMapMarkerAlt, FaEnvelope, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

function About() {
  const [resumeUrl, setResumeUrl] = useState(process.env.PUBLIC_URL + '/MohdJagdaResume.pdf?v=2');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkBackendResume = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/health`);
        if (response.ok) {
          setResumeUrl(`${apiUrl}/uploads/MohdJagdaResume.pdf?v=${Date.now()}`);
        }
      } catch (err) {
        // Fallback to static public PDF
      }
    };
    checkBackendResume();
  }, [apiUrl]);

  return (
    <section className="about-section" id="about">
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="about-left">
          <p>
            I’m Mohammed Jagda, an enthusiastic and detail-oriented Full-Stack Developer with a strong foundation in front-end and back-end technologies.
            I specialize in building dynamic, responsive web applications using React, JavaScript, and modern frameworks.
          </p>
          <p>
            With hands-on experience in MERN stack development, API scaling, caching, and AI integrations (FastAPI, Groq Vision), I enjoy solving complex engineering challenges and delivering premium user experiences.
          </p>
          <p>
            Beyond writing code, I actively contribute to the tech community as a student leader and hackathon organizer, driving collaboration, innovation, and impactful digital solutions.
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
