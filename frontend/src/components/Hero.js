import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Willy MUGABE</span>
          </h1>
          <div className="hero-subtitle">
            <span className="typed-text">Full Stack Developer</span>
          </div>
          <p className="hero-description">
            I craft beautiful, responsive, and user-friendly web applications 
            with modern technologies. Passionate about creating digital experiences 
            that make a difference.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToContact}>
              Get In Touch
            </button>
            <a href="#projects" className="btn btn-secondary">
              View My Work
            </a>
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left">
          <div className="image-wrapper">
            <div className="image-placeholder">
              <img src="/profile.png" alt="Willy MUGABE Profile" />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default Hero;