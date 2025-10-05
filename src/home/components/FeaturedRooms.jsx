import React from 'react';
import { roomsData } from '../../data/data';
import RoomCard from '../../rooms/components/RoomCard';

const FeaturedRooms = () => {
  const featuredRooms = roomsData.slice(0, 3);
  return (
    <div className="featured-rooms">
      <h2>Featured Rooms</h2>
      <div className="room-list">
        {featuredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
