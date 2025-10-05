import React, { useState } from 'react';
import RoomList from './components/RoomList';
import RoomSearch from './components/RoomSearch';
import RoomDetails from './components/RoomDetails';
import { roomsData } from '../data/data';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="rooms-page">
      <RoomSearch />
      <div className="rooms-content">
        <RoomList rooms={roomsData} onRoomSelect={setSelectedRoom} />
        <RoomDetails room={selectedRoom} />
      </div>
    </div>
  );
};

export default Rooms;
