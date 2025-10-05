import React from 'react';
import Hero from '../home/components/Hero';
import Services from '../home/components/Services';
import FeaturedRooms from '../home/components/FeaturedRooms';
import Testimonials from '../home/components/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedRooms />
      <Testimonials />
    </div>
  );
};

export default Home;
