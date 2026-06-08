import React from "react";
import { FaLaptopCode, FaUserTie, FaRunning, FaLightbulb, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "./Leadership.css";

const activities = [
  {
    icon: <FaLaptopCode />,
    role: "Head Event Organizer, AiCodeX Inter-Collegiate Hackathon 2024",
    duration: "Aug 2024 – Oct 2024",
    desc: "Led a Team of 20 Members, Directed end-to-end planning of a multi-phase hackathon with industry collaboration, managing timelines, sponsors, and final showcase.",
  },
  {
    icon: <FaUserTie />,
    role: "Secretary, IEEE MHSSCE Students Chapter",
    duration: "Mar 2025 – May 2025",
    desc: "Led planning and execution of technical events, workshops, and student engagement initiatives for the IEEE student chapter.",
  },
  {
    icon: <FaRunning />,
    role: "Sports Secretary, Students Association Council of Engineering",
    duration: "2025",
    desc: "Coordinated inter-department sports events, managed logistics, and increased student participation across campus tournaments.",
  },
  {
    icon: <FaLightbulb />,
    role: "General Secretary, Entrepreneurship Development Cell",
    duration: "Jul 2024 – May 2025",
    desc: "Oversaw entrepreneurship programs, startup events, and collaborations to foster innovation and leadership among students.",
  },
  {
    icon: <FaChalkboardTeacher />,
    role: "Head Event Organizer, Tableau Workshop",
    duration: "Mar 2024",
    desc: "Organized and executed a hands-on analytics workshop, enabling students to learn data visualization and business intelligence tools.",
  },
  {
    icon: <FaUsers />,
    role: "Jt. Admin Head, Students Association Council of Engineering",
    duration: "2024",
    desc: "Handled administrative coordination, permissions, and operations for large-scale college events and activities.",
  },
];

const Leadership = () => {
  return (
    <section className="leadership-section" id="leadership">
      <h2>Leadership & Extra-Curriculars</h2>
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
