import React from 'react';
import { FaBriefcase, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Nexcore Alliance LLP",
    duration: "March 2026 – Present",
    projects: [
      {
        name: "NEET720 — MERN STACK (Live)",
        link: "#",
        tech: ["MERN Stack", "Python", "FastAPI", "Groq Vision", "OMR Processing"],
        highlights: [
          "Engineered a custom QR-based OMR processing system in Python, enabling automated answer-sheet evaluation and student-grade mapping.",
          "Developed AI-powered document processing services with FastAPI and Groq Vision for automated extraction of questions, text, and diagrams from scanned PDFs.",
          "Resolved critical backend issues across APIs, authentication, database queries, and business workflows, significantly improving system stability and user experience."
        ]
      },
      {
        name: "myCoachingOS — MERN STACK (Live)",
        link: "#",
        tech: ["MERN Stack", "Redis Caching", "Server-Sent Events (SSE)", "Real-time Messaging"],
        highlights: [
          "Developed and optimized a full-scale Coaching Management, LMS, and ERP platform, delivering 50+ features across CRM, Fees Management, Attendance, Analytics, Reporting, Scheduling, Notifications, and role-based access modules for administrators, staff, students, and parents.",
          "Enhanced platform scalability through Redis caching, Server-Sent Events (SSE), and performance testing, supporting simulated workloads of 100K concurrent users.",
          "Implemented One-to-One Communication for In-Platform Communication between the Users and the Management."
        ]
      }
    ]
  }
];

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <h2>Professional Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot">
              <FaBriefcase />
            </div>
            
            <div className="experience-header">
              <div className="header-left">
                <h3>{exp.role}</h3>
                <span className="company-name">{exp.company}</span>
              </div>
              <span className="duration-badge">{exp.duration}</span>
            </div>

            <div className="experience-projects">
              {exp.projects.map((project, pIndex) => (
                <div className="experience-project-card" key={pIndex}>
                  <div className="project-header">
                    <h4>{project.name}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-live-link"
                      >
                        Live Project <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                  
                  <div className="project-tech">
                    {project.tech.map((t, tIndex) => (
                      <span className="tech-badge" key={tIndex}>{t}</span>
                    ))}
                  </div>

                  <ul className="project-highlights">
                    {project.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>
                        <span className="check-icon"><FaCheckCircle /></span>
                        <p>{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
