import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1>About Me</h1>

      <section className="about-intro">
        <p>
          I'm Paul Brower, a technology leader with over 25 years of experience
          in software development, IT leadership, and solution delivery. I'm passionate
          about building scalable systems, driving automation, and leading teams to
          deliver real business value.
        </p>
        <p>
          What sets me apart is that in addition to managing project and team logistics,
          I often contribute technically—both in architectural discussions and hands-on
          implementation. Spending time "in the weeds" helps me strengthen trust with
          my teams and build credibility quickly with clients.
        </p>
      </section>

      <section className="about-section">
        <h2>What I Do</h2>
        <p>
          Currently a Solution Delivery Manager at World Wide Technology, where I've
          spent over 11 years progressing through roles from Technical Project Manager
          to Senior Delivery Lead. I specialize in Agile methodologies, DevOps practices,
          Network Automation, and the Microsoft Power Platform, helping organizations
          automate processes and deliver successful outcomes efficiently.
        </p>
      </section>

      <section className="about-section">
        <h2>Career Highlights</h2>
        <div className="highlights">
          <div className="highlight-item">
            <h3>Distributed Computing at Scale</h3>
            <p>
              Built a credit card processing platform at Clearent capable of handling
              1 million transactions per hour on commodity hardware. The company became
              the first in 5 years to enter the payments industry as a back-end processor
              for MasterCard and Visa.
            </p>
          </div>
          <div className="highlight-item">
            <h3>Award-Winning Software</h3>
            <p>
              Led development of 'GENEtrak' at Monsanto, a C# application that won
              the 'Monsanto Above and Beyond Award' in 2006. Created automation solutions
              that were reviewed for patent consideration.
            </p>
          </div>
          <div className="highlight-item">
            <h3>IT Leadership</h3>
            <p>
              As Director of IT at Choice Genetics, served on the Executive Management
              Team and managed IT for multiple international subsidiaries under
              Groupe Grimaud.
            </p>
          </div>
          <div className="highlight-item">
            <h3>Early Impact</h3>
            <p>
              As CIO at Anderson Roofing, built software that helped grow company
              revenue over 40% within my first year through production automation
              and scheduling systems.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Tech Stack</h2>
        <div className="tech-list">
          <div className="tech-category">
            <h3>Languages</h3>
            <ul>
              <li>C#</li>
              <li>Python</li>
              <li>VBA</li>
              <li>SQL</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Microsoft Power Platform</h3>
            <ul>
              <li>Power Apps Development</li>
              <li>Power Automate</li>
              <li>Power BI Reporting & Apps</li>
              <li>Semantic Model Development</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Platforms & Tools</h3>
            <ul>
              <li>Ansible AAP</li>
              <li>SQL Server</li>
              <li>Jira</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Architecture</h3>
            <ul>
              <li>Microservices</li>
              <li>Distributed Systems</li>
              <li>DevOps</li>
              <li>Process Automation</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Methodologies</h3>
            <ul>
              <li>Agile / Scrum</li>
              <li>SAFe</li>
              <li>Solution Delivery</li>
              <li>Project Management</li>
              <li>Financial Forecasting</li>
              <li>Delivery Leadership</li>
              <li>Client Communication</li>
              <li>Pre-Emptive Risk Mitigation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Outside of Work</h2>
        <p>
          When I'm not leading delivery teams or building solutions, you'll find me
          tinkering with my home network setup, experimenting with new technologies,
          or working on personal coding projects.
        </p>
      </section>
    </div>
  );
}

export default About;
