import React from 'react';
import Story from './components/Story';
import { aboutData } from '../data/data';

const About = () => {
  const { title } = aboutData;
  return (
    <div className="about-page">
      <h1>{title}</h1>
      <Story />
    </div>
  );
};

export default About;
