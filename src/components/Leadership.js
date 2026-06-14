import React from "react";
import { FaLaptopCode, FaUserTie, FaRunning, FaLightbulb, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "./Leadership.css";

const activities = [
  {
    icon: <FaLaptopCode />,
    role: "Head Event Organizer, AiCodeX Inter-Collegiate Hackathon",
    duration: "Aug – Oct 2024",
    desc: "Led a 20-person team; managed end-to-end planning, sponsor coordination, and final showcase for a multi-phase industry-grade hackathon.",
  },
  {
    icon: <FaUserTie />,
    role: "Secretary, IEEE MHSSCE Students Chapter",
    duration: "Mar – May 2025",
    desc: "Led planning and execution of technical events, workshops, and student engagement initiatives for the IEEE student chapter.",
  },
  {
    icon: <FaLightbulb />,
    role: "General Secretary, Entrepreneurship Development Cell",
    duration: "Jul 2024 – May 2025",
    desc: "Oversaw entrepreneurship programs, startup events, and collaborations to foster innovation and leadership among students.",
  },
  {
    icon: <FaRunning />,
    role: "Sports Secretary, Students Association Council of Engineering",
    duration: "Dec 2024 – May 2025",
    desc: "Coordinated inter-department sports events, managed logistics, and increased student participation across campus tournaments.",
  },
  {
    icon: <FaUsers />,
    role: "Jt. Admin Head, Students Association Council of Engineering",
    duration: "Jan – May 2024",
    desc: "Handled administrative coordination, permissions, and operations for large-scale college events and activities.",
  },
  {
    icon: <FaChalkboardTeacher />,
    role: "Head Event Organizer, Tableau Data Visualization Workshop",
    duration: "Mar 2024",
    desc: "Organized and executed a hands-on analytics workshop, enabling students to learn data visualization and business intelligence tools.",
  },
  {
    icon: <FaUsers />,
    role: "Member, Computer Society of India (CSI)",
    duration: "Aug 2019 – Apr 2022",
    desc: "Engaged in technical seminars, coding challenges, and collaborative digital learning workshops.",
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
