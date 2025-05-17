import React from "react";
import { FaUserTie, FaRunning, FaLightbulb, FaLaptopCode, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "./Leadership.css";

const activities = [
  {
    icon: <FaUserTie />,
    role: "Secretary, IEEE MHSSCE Students Chapter",
    duration: "Mar 2025 - Present",
    desc: "Leading student activities and organizing technical events.",
  },
  {
    icon: <FaRunning />,
    role: "Sports Secretary, Students Association Council of Engineering, MHSSCE",
    duration: "Mar 2025 - Present",
    desc: "Coordinating sports events and promoting fitness initiatives.",
  },
  {
    icon: <FaLightbulb />,
    role: "General Secretary, Entrepreneurship Development Cell (EDC) at MHSSCE",
    duration: "Jul 2024 - Present",
    desc: "Driving entrepreneurship awareness and workshops for students.",
  },
  {
    icon: <FaLaptopCode />,
    role: "Head Event Organizer, AiCodeX Inter-Collegiate Hackathon 2024",
    duration: "Aug 2024 – Oct 2024",
    desc: "Managed end-to-end organization of a major inter-collegiate hackathon.",
  },
  {
    icon: <FaChalkboardTeacher />,
    role: "Head Event Organizer, Tableau Workshop",
    duration: "Mar 2024",
    desc: "Conducted hands-on workshop on data visualization using Tableau.",
  },
  {
    icon: <FaUsers />,
    role: "Joint Admin Head, Students Association Council of Engineering",
    duration: "2024",
    desc: "Assisted in administrative duties and event coordination.",
  },
];

const Leadership = () => {
  return (
    <section className="leadership-section">
      <h2>Leadership & Extracurricular Activities</h2>
      <div className="cards-container">
        {activities.map(({ icon, role, duration, desc }, idx) => (
          <div key={idx} className="activity-card">
            <div className="icon">{icon}</div>
            <div className="content">
              <h3>{role}</h3>
              <span className="duration">{duration}</span>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
