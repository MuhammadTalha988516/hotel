import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.type} />
      <h3>{room.type}</h3>
      <p>Price: ${room.price} per night</p>
      <p>{room.description}</p>
      <button>Book Now</button>
    </div>
  );
};

export default RoomCard;
