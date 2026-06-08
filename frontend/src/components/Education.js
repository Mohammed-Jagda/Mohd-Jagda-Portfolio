import React from 'react';
import { FaGraduationCap, FaCalendarAlt, FaAward } from 'react-icons/fa';
import './Education.css';

const educationData = [
  {
    degree: "Bachelor of Engineering in CSE (AI & ML)",
    board: "University of Mumbai",
    institution: "M.H. Saboo Siddik College of Engineering",
    duration: "Nov 2022 – May 2025",
    gradeType: "CGPA",
    grade: "8.44"
  },
  {
    degree: "Diploma in Computer Engineering",
    board: "MSBTE",
    institution: "M.H. Saboo Siddik Polytechnic",
    duration: "Jun 2019 – May 2022",
    gradeType: "Score",
    grade: "84.06%"
  }
];

function Education() {
  return (
    <section className="education-section" id="education">
      <h2>Education</h2>
      <div className="education-grid">
        {educationData.map((edu, index) => (
          <div className="education-card" key={index}>
            <div className="education-header">
              <span className="edu-icon"><FaGraduationCap /></span>
              <div className="degree-title">
                <h3>{edu.degree}</h3>
                <span className="board-badge">{edu.board}</span>
              </div>
            </div>
            
            <p className="institution-name">{edu.institution}</p>
            
            <div className="education-meta">
              <div className="meta-item">
                <span className="meta-icon"><FaCalendarAlt /></span>
                <p>{edu.duration}</p>
              </div>
              <div className="meta-item grade-glow">
                <span className="meta-icon"><FaAward /></span>
                <p><strong>{edu.gradeType}:</strong> {edu.grade}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
