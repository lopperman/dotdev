import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1>About Me</h1>

      <section className="about-intro">
        <p>
          I'm Paul Brower, a software developer who enjoys building practical solutions
          and tinkering with technology. Whether it's writing code, setting up home
          infrastructure, or exploring new tools, I'm always learning something new.
        </p>
      </section>

      <section className="about-section">
        <h2>Background</h2>
        <p>
          I've been working with software development for years, with experience
          spanning backend systems, frontend interfaces, and everything in between.
          I believe in writing clean, maintainable code and building things that
          actually work well for the people using them.
        </p>
      </section>

      <section className="about-section">
        <h2>Tech Stack</h2>
        <div className="tech-list">
          <div className="tech-category">
            <h3>Languages</h3>
            <ul>
              <li>Python</li>
              <li>JavaScript/TypeScript</li>
              <li>SQL</li>
              <li>Bash</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Backend</h3>
            <ul>
              <li>Flask</li>
              <li>FastAPI</li>
              <li>PostgreSQL</li>
              <li>Redis</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>HTML/CSS</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Tools & Infrastructure</h3>
            <ul>
              <li>Git</li>
              <li>Docker</li>
              <li>Linux</li>
              <li>Cloud Platforms</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Outside of Code</h2>
        <p>
          When I'm not coding, you'll find me working on home network projects,
          experimenting with new tech, or just enjoying time away from the screen.
        </p>
      </section>
    </div>
  );
}

export default About;
