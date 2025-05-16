import React from 'react';
import './Projects.css';

function ProjectHeading() {
  return (
    <div className="heading-container">
      <h2 className="heading-text">My Projects</h2>
    </div>
  );
}


const projects = [
  {
    title: "EventFlow – Event Coordination Website",
    tech: "PHP, MySQL",
    description:
      "A full-stack event management system with dual admin-registrar interfaces, automated attendance tracking, and printable reports.",
   
  },
  {
    title: "Venato – Employee Task Tracker",
    tech: "Java, XML, Firebase",
    description:
      "A task tracker with scheduling, progress tracking, leave management, and real-time notifications for better collaboration.",
   
  },
  {
    title: "TrainSpacerr – Find Vacancy in Local Train",
    tech: "Flutter, Flask, YOLOv8",
    description:
      "Real-time train coach vacancy monitoring with visual indicators using live camera feed and YOLO-based head count detection.",
    
  },
  {
    title: "Real-Time Sign Language Detection",
    tech: "Python, CNN",
    description:
      "A sign recognition system trained on ASL data with CNNs, supporting real-time detection through optimized preprocessing and model training.",
    
  },
  {
    title: "Blockchain-Based E-Voting System",
    tech: "Solidity, Blockchain",
    description:
      "A decentralized, tamper-proof e-voting system with smart contracts, cryptographic security, and real-time transparent auditing.",
    
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
            <p className="tech-stack"><strong>Tech Stack:</strong> {project.tech}</p>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
