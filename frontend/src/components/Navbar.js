import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsAdmin(!!token);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAdmin(false);
    navigate('/');
    closeMobileMenu();
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    closeMobileMenu();
    // Only handle smooth scroll if we're on the home page
    if (window.location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home page with hash
      navigate('/' + href);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu} className="logo-link">
            <div className="logo-container">
              <img src="/logo.png" alt="Willy MUGABE Logo" className="logo-image" />
              <span className="logo-name">Willy MUGABE</span>
            </div>
          </Link>
        </div>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <button onClick={() => handleNavClick(link.href)} className="nav-link-btn">
                  {link.name}
                </button>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link to="/admin" onClick={closeMobileMenu}>
                  Admin Panel
                </Link>
              </li>
            )}
            {isAdmin ? (
              <li>
                <button onClick={handleLogout} className="nav-logout-btn">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;