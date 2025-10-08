import React from 'react';

const RoomSearch = () => {
  return (
    <div className="room-search">
      <h2>Find Your Perfect Room</h2>
      <form>
        <div className="form-group">
          <label htmlFor="check-in">Check-in Date</label>
          <input type="date" id="check-in" />
        </div>
        <div className="form-group">
          <label htmlFor="check-out">Check-out Date</label>
          <input type="date" id="check-out" />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input type="number" id="guests" min="1" />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default RoomSearch;
