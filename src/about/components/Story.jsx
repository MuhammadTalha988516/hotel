import React from 'react';
import { aboutData } from '../../data/data';

const Story = () => {
  const { description, image } = aboutData;
  return (
    <div className="about-story">
      <div className="about-story-content">
        <p>{description}</p>
      </div>
      <div className="about-story-image">
        <img src={image} alt="About Us" />
      </div>
    </div>
  );
};

export default Story;
