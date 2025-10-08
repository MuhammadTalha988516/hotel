import React from 'react';
import { restaurantData } from '../data/data';

const Menu = () => {
  const { menu } = restaurantData;
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
