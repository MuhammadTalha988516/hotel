import React from 'react';

const RoomDetails = ({ room }) => {
  if (!room) {
    return <div>Select a room to see the details.</div>;
  }

  return (
    <div className="room-details">
      <h2>{room.type}</h2>
      <img src={room.image} alt={room.type} />
      <p>{room.description}</p>
      <p>Price: ${room.price} per night</p>
    </div>
  );
};

export default RoomDetails;
