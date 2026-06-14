import React from 'react';
import { FaTerminal, FaLaptopCode, FaServer, FaDatabase, FaBrain, FaNetworkWired, FaRobot, FaTools } from 'react-icons/fa';
import './Skills.css';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <FaTerminal />,
    skills: ["JavaScript", "Python", "Java", "Solidity"]
  },
  {
    title: "Frontend Development",
    icon: <FaLaptopCode />,
    skills: ["React.js", "Next.js", "Tailwind CSS", "XML"]
  },
  {
    title: "Backend Development",
    icon: <FaServer />,
    skills: ["Node.js", "Express.js", "FastAPI"]
  },
  {
    title: "Databases & Storage",
    icon: <FaDatabase />,
    skills: ["MongoDB", "MySQL", "Firebase"]
  },
  {
    title: "AI & Computer Vision",
    icon: <FaBrain />,
    skills: ["Groq Vision API", "TensorFlow/CNN", "OpenCV"]
  },
  {
    title: "Infrastructure & Systems",
    icon: <FaNetworkWired />,
    skills: ["Redis Caching", "SSE", "REST APIs", "Blockchain (Ethereum)"]
  },
  {
    title: "Generative AI Tools",
    icon: <FaRobot />,
    skills: ["Claude", "ChatGPT", "Grok", "Gemini"]
  },
  {
    title: "Developer Tools",
    icon: <FaTools />,
    skills: ["VS Code", "Cursor", "Antigravity", "Git", "GitHub", "Postman"]
  }
];

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div className="skills-card" key={index}>
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skills-list">
              {category.skills.map((skill, sIndex) => (
                <span className="skill-badge" key={sIndex}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
