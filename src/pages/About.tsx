import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <a
        href="https://rs.school/courses/javascript-ru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="about-logo"></div>
      </a>
    </div>
  );
};

export default About;
