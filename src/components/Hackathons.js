import React from 'react';
import { FaTrophy, FaAward, FaUsers, FaTools } from 'react-icons/fa';
import './Hackathons.css';

const hackathons = [
  {
    title: "ERR_404 5.0 2025 @ M.H. Saboo Siddik College of Engineering",
    description: "Created a Document Intelligence System using AI and NLP for smart classification, extraction, and summarization.",
    tech: "AI, NLP, Python",
    team: ["Shaikh Abdul Mannan", "Shaheed Pathan"]
  },
  {
    title: "Aavishkar Research Convention 2024 by University of Mumbai",
    description: "Presented a research project on 'Implementation and Security of Blockchain-Based Electronic Voting System' at Lokmanya Tilak College of Engineering under the University of Mumbai.",
    tech: "React, Solidity",
    team: ["Abdul Mannan Shaikh", "Muskaan Khan", "Nabila Qureshi", "Shaheed Pathan"],
    category: "Engineering and Technology (UG Level)",
    award: "Research Presenter"
  },
  {
    title: "HackCelestial 1.0 2024 @ Pillai College of Engineering",
    description: "Built a Student Management Information System using Ionic React and NestJS with MongoDB. Focused on digitizing academic and administrative workflows.",
    tech: "Ionic React, NestJS, MongoDB",
    team: ["Abdul Mannan Shaikh", "Shaheed Pathan", "Muskaan Khan", "Nabila Qureshi"]
  },
  {
    title: "Smart India Hackathon 2024",
    description: "Developed a Glaucoma Diagnosis Kit using a mobile camera + 20D lens, U-Net & Seg-Net for segmentation, and OpenCV for VCDR calculation.",
    tech: "Flutter, U-Net, Seg-Net, OpenCV",
    team: ["Shaikh Abdul Mannan", "Shaheed Pathan", "Mohammed Jagda"],
    award: "National Finalist"
  },
  {
    title: "Aavishkar Research Convention 2023 by University of Mumbai",
    description: "Finalists with the project 'Rail Vacancy Detection' using YOLOv8 to detect coach occupancy in local trains.",
    tech: "YOLOv8, Python",
    team: ["Mohammed Irfan Siddiqui", "Aqeel Memon", "Kaif Tokare"],
    category: "Engineering and Technology (UG Level)",
    guide: "Prof. Chaitali Mahajan",
    award: "Finalist"
  },
  {
    title: "Smart India Hackathon 2023",
    description: "Developed a Government Land Information System to improve transparency and land data accessibility for government use.",
    tech: "React, Node.js, MongoDB",
    team: ["Kaif Tokare", "Muskaan Khan", "Mohammed Irfan Siddiqui", "Aqeel Memon", "Rashid Ghansar"]
  }
];

const Hackathons = () => {
  return (
    <section className="hackathons-section" id="hackathons">
      <h2>Hackathons & Research</h2>
      <div className="hackathons-grid">
        {hackathons.map((hack, index) => (
          <div className="hackathon-card" key={index}>
            <div className="hackathon-header">
              <span className="hackathon-icon">
                {hack.award ? <FaTrophy className="award-glow" /> : <FaAward />}
              </span>
              {hack.award && <span className="award-badge">{hack.award}</span>}
            </div>
            
            <h3>{hack.title}</h3>
            <p className="hack-desc">{hack.description}</p>
            
            <div className="hack-details">
              <div className="detail-item">
                <span className="detail-icon"><FaTools /></span>
                <p><strong>Tech:</strong> {hack.tech}</p>
              </div>
              
              {hack.team && (
                <div className="detail-item">
                  <span className="detail-icon"><FaUsers /></span>
                  <p><strong>Team:</strong> {hack.team.join(', ')}</p>
                </div>
              )}
              
              {hack.category && <p className="hack-meta">Category: {hack.category}</p>}
              {hack.guide && <p className="hack-meta">Guide: {hack.guide}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
