import React from 'react';
import { FaTerminal, FaLaptopCode, FaDatabase, FaKeyboard, FaRobot } from 'react-icons/fa';
import './Skills.css';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <FaTerminal />,
    skills: ["JavaScript", "Java", "Python"]
  },
  {
    title: "Libraries & Frameworks",
    icon: <FaLaptopCode />,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS"]
  },
  {
    title: "Databases",
    icon: <FaDatabase />,
    skills: ["MongoDB", "Firebase", "MySQL"]
  },
  {
    title: "IDEs",
    icon: <FaKeyboard />,
    skills: ["Antigravity", "Cursor", "VS Code", "Sublime Text"]
  },
  {
    title: "AI Tools",
    icon: <FaRobot />,
    skills: ["Claude", "Grok", "ChatGPT", "Gemini"]
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
