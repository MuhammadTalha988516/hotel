import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <h1>Hotel Booking</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/rooms">Rooms</a></li>
        <li><a href="/facilities">Facilities</a></li>
        <li><a href="/restaurant">Restaurant</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
