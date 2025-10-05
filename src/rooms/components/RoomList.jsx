import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms }) => {
  return (
    <div className="room-list">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
