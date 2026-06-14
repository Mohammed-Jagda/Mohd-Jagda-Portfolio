import React from 'react';
import { FaBriefcase, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    role: "Software Developer",
    company: "Nexcore Alliance LLP",
    duration: "March 2026 – Present",
    projects: [
      {
        name: "NEET720 — AI-Enhanced OMR & Exam Management Platform (Live)",
        link: "#",
        tech: ["MERN Stack", "Python", "FastAPI", "Groq Vision", "OMR Processing"],
        highlights: [
          "Engineered a production-grade, QR-based OMR processing engine in Python that fully automated answer-sheet evaluation and student-grade mapping — eliminating manual grading overhead for thousands of exam entries.",
          "Architected AI document processing microservices using FastAPI + Groq Vision to extract questions, text, and diagrams from scanned PDFs, reducing manual data-entry time by an estimated 80%.",
          "Triaged and resolved critical backend defects across authentication, API layers, database queries, and business logic — directly improving platform stability, user retention, and trust."
        ]
      },
      {
        name: "myCoachingOS — Enterprise LMS, ERP & CRM Platform (Live)",
        link: "#",
        tech: ["MERN Stack", "Redis Caching", "eSSL Biometric Integration", "iOS/Android Roadmap"],
        highlights: [
          "Designed and delivered 50+ product features spanning CRM, Fee Management, Attendance, Analytics, Scheduling, Notifications, and role-based access for admins, staff, students, and parents — functioning as a one-person feature squad.",
          "Scaled platform infrastructure using Redis caching, validating system performance under simulated loads of 100,000 concurrent users — demonstrating production-readiness at enterprise scale.",
          "Built a real-time One-to-One Communication module enabling seamless in-platform messaging between students, parents, and management — improving engagement and reducing external tool dependency.",
          "Integrated Biometric Attendance Management via eSSL Device Integration, automating physical checkout/check-in tracking.",
          "Coordinated roadmap planning for custom-branded iOS and white-labeled Android mobile applications customized for individual training institutes.",
        ]
      },
      {
        name: "Alliance Quiz AI — High-Performance Quiz Generation Engine (Live)",
        link: "#",
        tech: ["Node.js", "Mongoose", "React.js", "Next.js", "Database Performance"],
        highlights: [
          "Redesigned the backend assessment pipeline (Node.js/Mongoose) to partition exact 200-question profiles across MERN and IQ categories, implementing custom category-based seen-question reset logic to manage question freshness.",
          "Developed a real-time concurrency collision-avoidance system using a dynamic exclusion filter that cross-references active in-progress quiz attempts, ensuring concurrent students never receive duplicate questions and guaranteeing 100% test integrity.",
          "Cleansed, deduplicated, and seeded a database of 1,200+ questions, fixed deprecated database query parameters, and resolved React/Next.js hydration mismatch errors to optimize page load and client-side stability."
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
                    {project.link && project.link !== "#" && (
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
