import React from 'react';
import { FaCalendarAlt, FaTasks, FaTrain, FaHandPaper, FaVoteYea, FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: "Real-Time Sign Language Detection",
    tech: "Python, CNN",
    description: "A sign recognition system trained on ASL data with CNNs, supporting real-time detection through optimized preprocessing and model training.",
    github: "https://github.com/Jagda2003/Real-Time-Sign-Language-Detection.git",
    icon: <FaHandPaper />
  },
  {
    title: "Blockchain-Based E-Voting System",
    tech: "Solidity, Blockchain",
    description: "A decentralized, tamper-proof e-voting system with smart contracts, cryptographic security, and real-time transparent auditing.",
    github: "https://github.com/Jagda2003/Blockchain-Based-E-Voting.git",
    icon: <FaVoteYea />
  },
  {
    title: "EventFlow – Event Coordination Website",
    tech: "PHP, MySQL",
    description: "A full-stack event management system with dual admin-registrar interfaces, automated attendance tracking, and printable reports.",
    github: "https://github.com/Jagda2003/EventFlow.git",
    icon: <FaCalendarAlt />
  },
  {
    title: "Venato – Employee Task Tracker",
    tech: "Java, XML, Firebase",
    description: "A task tracker with scheduling, progress tracking, leave management, and real-time notifications for better collaboration.",
    github: "https://github.com/Jagda2003/Venato-Task-Tracking-and-Schedling.git",
    icon: <FaTasks />
  },
  {
    title: "TrainSpacerr – Find Vacancy in Local Train",
    tech: "Flutter, Flask, YOLOv8",
    description: "Real-time train coach vacancy monitoring with visual indicators using live camera feed and YOLO-based head count detection.",
    github: "https://github.com/Jagda2003/TrainSpacer-Using-Yolo-V8.git",
    icon: <FaTrain />
  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-icon">{project.icon}</div>
            <h3>{project.title}</h3>
            <div className="project-tech-list">
              {project.tech.split(', ').map((t, idx) => (
                <span className="proj-tech-badge" key={idx}>{t}</span>
              ))}
            </div>
            <p>{project.description}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
