import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  
  const navbarRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Refs for scroll reveal elements
  const titleRefs = useRef([]);
  const projectCardRefs = useRef([]);
  const skillTagRefs = useRef([]);
  const contactElementRefs = useRef([]);

  // Typing effect data
  const typingTexts = ["a Web Developer", "a Coder", "a Graphic Designer"];

  // Skills data
  const frontendSkills = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "JavaScript", percentage: 90 },
    { name: "React", percentage: 85 },
    { name: "UI/UX Design", percentage: 80 }
  ];

  const backendSkills = [
    { name: "Node.js", percentage: 85 },
    { name: "Express", percentage: 80 },
    { name: "MongoDB", percentage: 75 },
    { name: "SQL", percentage: 70 }
  ];

  const otherSkills = [
    { name: "Git/GitHub", percentage: 90 },
    { name: "Responsive Design", percentage: 95 },
    { name: "Graphic Design", percentage: 80 },
    { name: "Problem Solving", percentage: 85 }
  ];

  useEffect(() => {
    // Add loaded class after a small delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Typing effect
    const typingInterval = setInterval(() => {
      setTypingIndex(prevIndex => (prevIndex + 1) % typingTexts.length);
    }, 3000);

    // Navbar scroll effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Check if skills section is visible to trigger animations
      if (skillsRef.current) {
        const skillsTop = skillsRef.current.getBoundingClientRect().top;
        if (skillsTop < window.innerHeight - 100) {
          setSkillsVisible(true);
        }
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

    window.addEventListener('scroll', handleScroll);
    
    // Initial check for elements in view
    setTimeout(() => handleScroll(), 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typingInterval);
    };
  }, [typingTexts.length]);

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

  return (
    <div className={`homepage ${isLoaded ? 'loaded' : ''}`}>
      {/* Background particles */}
      <div className="particles">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="particle" style={{ 
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            animation: `floatingParticles ${25 + index * 5}s linear infinite`,
            animationDelay: `${index * 2}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}></div>
        ))}
      </div>
      
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="nav-logo">PS</div>
        <div className="nav-links">
          <button onClick={() => scrollToSection(projectsRef)}>Projects</button>
          <button onClick={() => scrollToSection(skillsRef)}>Skills</button>
          <button onClick={() => scrollToSection(contactRef)}>Contact</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Hello, I'm <span>Preet Sharma</span></h1>
          <div className="typing-wrapper">
            <div className="typing-effect">
              I'm {typingTexts[typingIndex]}
            </div>
          </div>
          <p>
            A passionate full-stack developer dedicated to creating elegant, user-friendly applications
            that deliver exceptional experiences and solve real-world problems.
          </p>
          <button onClick={() => scrollToSection(projectsRef)} className="cta-button">View My Work</button>
        </div>
        
        <div className="hero-image">
          <div className="svg-animation">
            <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0062ff" />
                  <stop offset="100%" stopColor="#6c47ff" />
                </linearGradient>
              </defs>
              <g transform="translate(400, 300)">
                <circle r="150" fill="none" stroke="url(#gradient)" strokeWidth="4" opacity="0.2">
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="0" 
                    to="360" 
                    dur="30s" 
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="120" fill="none" stroke="url(#gradient)" strokeWidth="3" opacity="0.4">
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="360" 
                    to="0" 
                    dur="20s" 
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="90" fill="none" stroke="url(#gradient)" strokeWidth="2" opacity="0.6">
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="0" 
                    to="360" 
                    dur="15s" 
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="180" fill="none" stroke="url(#gradient)" strokeWidth="1" opacity="0.1">
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="360" 
                    to="0" 
                    dur="40s" 
                    repeatCount="indefinite"
                  />
                </circle>
                <g>
                  <circle r="60" fill="url(#gradient)" opacity="0.2" />
                  <text x="0" y="0" textAnchor="middle" fill="#6c47ff" fontWeight="bold" fontSize="24" dy=".3em">PS</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="projects" ref={projectsRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card" ref={(el) => addToRefs(el, projectCardRefs)}>
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>E-commerce Platform</h3>
              <p>A full-featured online store with payment processing and inventory management.</p>
            </div>
          </div>
          <div className="project-card" ref={(el) => addToRefs(el, projectCardRefs)}>
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>Task Management App</h3>
              <p>A productivity application with drag-and-drop functionality and team collaboration.</p>
            </div>
          </div>
          <div className="project-card" ref={(el) => addToRefs(el, projectCardRefs)}>
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>Weather Dashboard</h3>
              <p>Real-time weather data visualization with location-based forecasting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" ref={skillsRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Skills & Technologies</h2>
        <div className="skills-container">
          <div className="skills-row">
            <div className="skills-category">
              <h3>Frontend</h3>
              {frontendSkills.map((skill, index) => (
                <div className="skill-bar" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-progress-bg">
                    <div 
                      className={`skill-progress-fill ${skillsVisible ? 'animate' : ''}`} 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skills-category">
              <h3>Backend</h3>
              {backendSkills.map((skill, index) => (
                <div className="skill-bar" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-progress-bg">
                    <div 
                      className={`skill-progress-fill ${skillsVisible ? 'animate' : ''}`} 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skills-category">
              <h3>Other Skills</h3>
              {otherSkills.map((skill, index) => (
                <div className="skill-bar" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-progress-bg">
                    <div 
                      className={`skill-progress-fill ${skillsVisible ? 'animate' : ''}`} 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-tags">
            {["React", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", 
              "SQL", "HTML5", "CSS3", "Responsive Design", "Git", "AWS"].map((skill, index) => (
              <span 
                key={index} 
                className="skill-tag" 
                ref={(el) => addToRefs(el, skillTagRefs)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" ref={contactRef}>
        <h2 className="section-title" ref={(el) => addToRefs(el, titleRefs)}>Get In Touch</h2>
        <p ref={(el) => addToRefs(el, contactElementRefs)}>
          I'm currently available for freelance work and full-time opportunities. 
          If you have a project in mind or want to discuss potential collaborations,
          feel free to reach out!
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