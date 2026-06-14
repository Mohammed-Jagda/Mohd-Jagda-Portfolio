import React from 'react';
import { FaCalendarAlt, FaTasks, FaTrain, FaHandPaper, FaVoteYea, FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: "Blockchain-Based E-Voting System",
    tech: "JavaScript, Solidity, Ethereum",
    description: "Designed a tamper-proof, decentralized voting platform on Ethereum using smart contracts, delivering verifiable election integrity. Implemented cryptographic voter anonymization protocols ensuring privacy compliance.",
    github: "https://github.com/Jagda2003/Blockchain-Based-E-Voting.git",
    icon: <FaVoteYea />
  },
  {
    title: "Real-Time Sign Language Detection",
    tech: "Python, CNN, TensorFlow",
    description: "Trained a Convolutional Neural Network on the ASL dataset with advanced feature extraction techniques, achieving high real-time gesture recognition accuracy. Built as a deployable accessibility tool.",
    github: "https://github.com/Jagda2003/Real-Time-Sign-Language-Detection.git",
    icon: <FaHandPaper />
  },
  {
    title: "Venato – Employee Task Tracker & Scheduler",
    tech: "Java, XML, Firebase",
    description: "Developed a full-featured Android task management system enabling role-based task assignment, monitoring, and scheduling. Integrated Firebase for real-time data sync and offline reliability.",
    github: "https://github.com/Jagda2003/Venato-Task-Tracking-and-Schedling.git",
    icon: <FaTasks />
  },
  {
    title: "EventFlow – Event Coordination Website",
    tech: "PHP, MySQL",
    description: "A full-stack event management system with dual admin-registrar interfaces, automated attendance tracking, and printable reports for college event coordination.",
    github: "https://github.com/Jagda2003/EventFlow.git",
    icon: <FaCalendarAlt />
  },
  {
    title: "TrainSpacerr – Find Vacancy in Local Train",
    tech: "Flutter, Flask, YOLOv8",
    description: "Real-time train coach vacancy monitoring with visual indicators using live camera feed and YOLO-based head count detection to optimize passenger distributions.",
    github: "https://github.com/Jagda2003/TrainSpacer-Using-Yolo-V8.git",
    icon: <FaTrain />
  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Educational Projects</h2>
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
