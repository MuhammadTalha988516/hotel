import React from 'react';
import { homeData } from '../../data/data';

const Hero = () => {
  const { title, subtitle, image } = homeData.banner;
  return (
    <div className="hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default Hero;
