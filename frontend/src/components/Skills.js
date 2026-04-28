import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = {
    frontend: ['HTML', 'CSS', 'TailwindCSS', 'React', 'JavaScript'],
    backend: ['Node.js', 'JavaScript', 'PHP', 'Express.js'],
    database: ['MySQL', 'MongoDB', 'PostgreSQL'],
    tools: ['Git', 'GitHub', 'VSCode', 'Postman']
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 data-aos="fade-up">My Skills</h2>
        <div className="skills-content">
          <div className="skills-category" data-aos="fade-up">
            <h3>Frontend Development</h3>
            <div className="skills-list">
              {skills.frontend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category" data-aos="fade-up" data-aos-delay="100">
            <h3>Backend Development</h3>
            <div className="skills-list">
              {skills.backend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category" data-aos="fade-up" data-aos-delay="200">
            <h3>Database</h3>
            <div className="skills-list">
              {skills.database.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category" data-aos="fade-up" data-aos-delay="300">
            <h3>Tools & Others</h3>
            <div className="skills-list">
              {skills.tools.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;