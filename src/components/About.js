import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <h2><br></br>About Me</h2>
      <p>
        I’m Mohammed Jagda, an enthusiastic and detail-oriented full-stack developer with a strong foundation in front-end and back-end technologies. 
        I specialize in building dynamic, responsive web applications using React, JavaScript, and modern frameworks, with additional hands-on experience in 
        Solidity, Blockchain, AI/ML, and cross-platform development.
        <br /><br />
        Beyond coding, I actively contribute to the tech community as a student leader and hackathon organizer, with a focus on innovation, collaboration, and delivering impactful solutions.
      </p>
      <div className="btn-wrapper">
        <a href="/MohdJagdaCV" download className="btn-download">
          Download My CV
        </a>
      </div>
    </section>
  );
}

export default About;
