import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 data-aos="fade-up">About Me</h2>
        <div className="about-content">
          <div className="about-text" data-aos="fade-right">
            <p>
              I'm a passionate Full Stack Developer with expertise in creating modern, 
              responsive web applications. With a strong foundation in both frontend and 
              backend technologies, I bring ideas to life through clean, efficient code.
            </p>
            <p>
              My journey in web development started with a curiosity about how things work 
              on the internet, and has evolved into a career focused on building user-centric 
              digital experiences. I enjoy tackling complex problems and learning new technologies.
            </p>
            <div className="about-buttons">
              <a 
                href="https://github.com/ITWILLY205" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-button github-button"
              >
                <span className="button-icon">🐙</span>
                GitHub
              </a>
              <a 
                href="mailto:willymugabe2@gmail.com" 
                className="contact-button email-button"
              >
                <span className="button-icon">📧</span>
                Email
              </a>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="about-image" data-aos="fade-left">
            <div className="image-wrapper">
              <div className="image-placeholder">
                <img src="/profile.png" alt="Willy MUGABE Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;