import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
// Import the background image directly from the assets folder
import backgroundImage from './assets/IMG_C7E5EB3A9F5F-1.jpeg';

// Custom hook for typing animation
function useTypingAnimation(texts, typingSpeed = 150, deletingSpeed = 75, delayBeforeDeleting = 1500, delayBeforeTyping = 500) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current word
      const fullText = texts[currentTextIndex];
      
      // If deleting
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        // If typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      // Determine next steps
      if (!isDeleting && currentText === fullText) {
        // If finished typing, start deleting after delay
        setTimeout(() => setIsDeleting(true), delayBeforeDeleting);
      } else if (isDeleting && currentText === '') {
        // If finished deleting, move to next word
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        // Delay before typing the next word
        setTimeout(() => {}, delayBeforeTyping);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBeforeDeleting, delayBeforeTyping]);

  return { currentText, isTyping: !isDeleting && currentText !== texts[currentTextIndex] };
}

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Log the background image path to verify it's imported correctly
  console.log("Background image path:", backgroundImage);
  
  const navbarRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Refs for scroll reveal elements
  const titleRefs = useRef([]);
  const projectCardRefs = useRef([]);
  const skillTagRefs = useRef([]);
  const contactElementRefs = useRef([]);

  // Roles for animation with enhanced descriptions and tooltips
  const roles = [
    { text: "Graphic Designer", desc: "Creating visually stunning designs that communicate ideas effectively" },
    { text: "Avid Traveller", desc: "Exploring cultures and drawing inspiration from global experiences" },
    { text: "Front-end Developer", desc: "Building beautiful and responsive user interfaces with modern technologies" },
    { text: "UI/UX Enthusiast", desc: "Crafting intuitive and engaging user experiences" },
    { text: "Web Developer", desc: "Bringing websites to life with HTML, CSS and JavaScript" },
    { text: "Coder", desc: "Writing clean, efficient code with passion and attention to detail" }
  ];
  
  // Use the custom typing animation hook with just the text
  const { currentText } = useTypingAnimation(roles.map(role => role.text));
  
  // Find the current role object to show its description
  const currentRole = roles.find(role => role.text === currentText) || roles[0];

  useEffect(() => {
    // Add loaded class after a small delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Navbar scroll effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Scroll reveal animation
      const revealElements = (refs) => {
        refs.current.forEach(el => {
          if (!el) return;
          const elementTop = el.getBoundingClientRect().top;
          const elementVisible = 150;
          if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('visible');
          }
        });
      };
      
      revealElements(titleRefs);
      revealElements(projectCardRefs);
      revealElements(skillTagRefs);
      revealElements(contactElementRefs);
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuOpen && 
          !event.target.closest('.nav-links') && 
          !event.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    // Initial check for elements in view
    setTimeout(() => handleScroll(), 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Helper function to add refs to ref arrays
  const addToRefs = (el, refs) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close mobile menu when clicking a navigation item
  const handleNavClick = (ref) => {
    scrollToSection(ref);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <div className={`homepage ${isLoaded ? 'loaded' : ''}`}>
      {/* Background particles removed */}
      
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="nav-logo">PS</div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => handleNavClick(projectsRef)}>Projects</button>
          <button onClick={() => handleNavClick(skillsRef)}>Skills</button>
          <button onClick={() => handleNavClick(contactRef)}>Contact</button>
        </div>
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section className="hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}>
        <div className="hero-content">
          <div className="hero-intro">Hello, I am</div>
          <h1>Preet Sharma</h1>
          <div className="hero-subtitle">
            CSE :- NIT JALANDHAR
            <span className="role-separator">|</span>
            <div className="role-animation">
              <span className="role-text">{currentText}</span>
              <div className="role-tooltip">{currentRole.desc}</div>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/preet-sharma-85b744313/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Google Plus"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
          </div>
          <button onClick={() => scrollToSection(projectsRef)} className="cta-button">Projects</button>
        </div>
      </section>

      {/* Projects Section with enhanced styling */}
      <section className="projects" id="projects" ref={projectsRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Featured Projects</h2>
        <p className="section-subtitle">A showcase of my recent design and development work</p>
        
        <div className="guide-banner">
          <i className="fas fa-arrow-down"></i>
          <h3>Click on any project to see details</h3>
          <i className="fas fa-arrow-down"></i>
        </div>
        
        <div className="project-grid">
          <a href="https://placement-portal-cse.vercel.app/" className="project-card-link">
            <div className="project-card">
              <div className="project-image">
                <img src="https://v1.nitj.ac.in/ecell/assets/img/knm_slshow/one.jpg" alt="NITJ Placements" />
                <div className="project-overlay">
                  <div className="project-links">
                    <span className="project-link"><i className="fas fa-external-link-alt"></i></span>
                    <span className="project-link"><i className="fab fa-github"></i></span>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>Placement Portal Website for NIT Jalandhar</h3>
                <p>Developed and deployed a placement portal integrated with the college's main website to streamline the placement process for students and recruiters.</p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">API Integration</span>
                </div>
              </div>
            </div>
          </a>
          
          <a href="https://seatsetgo.live/" className="project-card-link">
            <div className="project-card">
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="SeatSetGo" />
                <div className="project-overlay">
                  <div className="project-links">
                    <span className="project-link"><i className="fas fa-external-link-alt"></i></span>
                    <span className="project-link"><i className="fab fa-github"></i></span>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>JoSAA Counselling & Mentoring Website</h3>
                <p>Designed and developed a website to assist IIT-JEE aspirants with JoSAA counselling by providing detailed guidance, important dates, choice-filling strategies, and mentoring support.</p>
              </div>
            </div>
          </a>
          
          <a href="https://hackmol-repo.vercel.app/" className="project-card-link">
            <div className="project-card">
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="TokenFlow" />
                <div className="project-overlay">
                  <div className="project-links">
                    <span className="project-link"><i className="fas fa-external-link-alt"></i></span>
                    <span className="project-link"><i className="fab fa-github"></i></span>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>TokenFlow-Based GPT Model Marketplace</h3>
                <p>Developed a real-time platform for buying and selling GPT models using token-based transactions, facilitating seamless interaction between Pro and Non-Pro users with blockchain integration.</p>
                <div className="project-tech">
                  <span className="tech-tag">Vue.js</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">Web3.js</span>
                  <span className="tech-tag">Solidity</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="skills" ref={skillsRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Skills & Technologies</h2>
        <div className="skills-container">
          <div className="skill-tags-grid">
            {[
              {name: "HTML"},
              {name: "CSS"},
              {name: "JavaScript"},
              {name: "ReactJS"},
              {name: "Tailwind"},
              {name: "SQL"},
              {name: "Data Visualization"},
              {name: "Tableau"},
              {name: "Power BI"},
              {name: "C++"},
              {name: "Python"},
              {name: "Canva"},
              {name: "VN Editor"},
              {name: "Content Creation"},
              {name: "Graphic Design"}
            ].map((skill, index) => (
              <div 
                key={index} 
                className="skill-item" 
                ref={(el) => addToRefs(el, skillTagRefs)}
              >
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" ref={contactRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Get In Touch</h2>
        <p ref={(el) => addToRefs(el, contactElementRefs)}>
          I'm currently available for freelance work and full-time opportunities. 
          Feel free to reach out if you'd like to collaborate!
        </p>
        <div className="contact-links">
          <a href="mailto:contact@preet.dev" className="contact-link" ref={(el) => addToRefs(el, contactElementRefs)}>Email</a>
          <a href="https://github.com/preet" className="contact-link" ref={(el) => addToRefs(el, contactElementRefs)}>GitHub</a>
          <a href="https://linkedin.com/in/preet" className="contact-link" ref={(el) => addToRefs(el, contactElementRefs)}>LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Preet Sharma. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage; 