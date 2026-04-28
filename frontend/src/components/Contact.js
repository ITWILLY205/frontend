import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { contactAPI } from '../services/api';
import { testAPIConnection, createFallbackContact } from '../utils/apiTest';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting contact form:', formData);
      
      // First test API connection
      const apiConnected = await testAPIConnection();
      console.log('API connection test result:', apiConnected);
      
      if (apiConnected) {
        // Try API submission
        const response = await contactAPI.submitContact(formData);
        console.log('Contact form response:', response);
        toast.success('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to localStorage
        console.log('API not available, using fallback');
        const fallbackContact = createFallbackContact(formData);
        console.log('Fallback contact saved:', fallbackContact);
        toast.success('Message saved locally! I will check it and get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      console.error('Error response:', error.response);
      
      // Try fallback if API fails
      try {
        const fallbackContact = createFallbackContact(formData);
        console.log('Fallback contact saved:', fallbackContact);
        toast.success('Message saved locally! I will check it and get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 data-aos="fade-up">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-right">
            <h3>Let's Talk</h3>
            <p>I'm always interested in hearing about new projects and opportunities.</p>
            <div className="info-item">
              <span>willymugabe2@gmail.com</span>
            </div>
            <div className="info-item">
              <span>+250792602603</span>
            </div>
            <div className="info-item">
              <span>Rwanda, Kigali, Remera</span>
            </div>
            <div className="social-links">
              <a href="https://github.com/ITWILLY205" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/mugabe-willy" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;