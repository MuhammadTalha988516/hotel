import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.type}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-gray-800 font-semibold">${room.price}/night</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{room.type}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{room.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">2 Guests</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600">25 m²</span>
            </div>
          </div>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center">
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
