import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Preet Sharma</h1>
        <p>
          Full-stack developer passionate about creating elegant, user-friendly applications.
          Specialized in modern web technologies and responsive design.
        </p>
        <button className="cta-button">View My Work</button>
      </section>

      <section className="projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>E-commerce Platform</h3>
              <p>A full-featured online store with payment processing and inventory management.</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>Task Management App</h3>
              <p>A productivity application with drag-and-drop functionality and team collaboration.</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-image">Project Image</div>
            <div className="project-info">
              <h3>Weather Dashboard</h3>
              <p>Real-time weather data visualization with location-based forecasting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-container">
          <span className="skill-tag">React</span>
          <span className="skill-tag">JavaScript</span>
          <span className="skill-tag">TypeScript</span>
          <span className="skill-tag">Node.js</span>
          <span className="skill-tag">Express</span>
          <span className="skill-tag">MongoDB</span>
          <span className="skill-tag">SQL</span>
          <span className="skill-tag">HTML5</span>
          <span className="skill-tag">CSS3</span>
          <span className="skill-tag">Responsive Design</span>
          <span className="skill-tag">Git</span>
          <span className="skill-tag">AWS</span>
        </div>
      </section>

      <section className="contact">
        <h2 className="section-title">Get In Touch</h2>
        <p>I'm currently available for freelance work and full-time opportunities. Feel free to reach out if you'd like to collaborate!</p>
        <div className="contact-links">
          <a href="mailto:contact@preet.dev" className="contact-link">Email</a>
          <a href="https://github.com/preet" className="contact-link">GitHub</a>
          <a href="https://linkedin.com/in/preet" className="contact-link">LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Preet Sharma. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage; 