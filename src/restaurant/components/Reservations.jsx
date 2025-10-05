import React from 'react';

const Reservations = () => {
  return (
    <div className="reservations">
      <h2>Make a Reservation</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input type="number" id="guests" min="1" />
        </div>
        <button type="submit">Book a Table</button>
      </form>
    </div>
  );
};

export default Reservations;
