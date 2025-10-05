import React from 'react';
import Menu from './components/Menu';
import Chef from './components/Chef';
import Reservations from './components/Reservations';
import { restaurantData } from '../data/data';

const Restaurant = () => {
  const { title, description, image } = restaurantData;
  return (
    <div className="restaurant-page">
      <div className="restaurant-hero" style={{ backgroundImage: `url(${image})` }}>
        <div className="restaurant-hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <Menu />
      <Chef />
      <Reservations />
    </div>
  );
};

export default Restaurant;
