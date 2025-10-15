import React, { useState } from "react";
import { Bed, Users, Maximize, Heart, Wifi, Coffee, Dumbbell, ArrowRight } from "lucide-react";

const FeaturedRooms = () => {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean Suite",
      image:
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
      price: 299,
      capacity: 2,
      size: "45 m²",
      features: ["King Bed", "Ocean View", "Private Balcony"],
      amenities: ["wifi", "breakfast", "gym"],
    },
    {
      id: 2,
      name: "Presidential Suite",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      price: 599,
      capacity: 4,
      size: "85 m²",
      features: ["Master Bedroom", "Living Room", "Jacuzzi"],
      amenities: ["wifi", "breakfast", "gym"],
    },
    {
      id: 3,
      name: "Executive Business Room",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      price: 199,
      capacity: 2,
      size: "35 m²",
      features: ["Queen Bed", "Work Desk", "City View"],
      amenities: ["wifi", "breakfast"],
    },
  ];

  const getAmenityIcon = (a) => {
    switch (a) {
      case "wifi":
        return <Wifi size={15} />;
      case "breakfast":
        return <Coffee size={15} />;
      case "gym":
        return <Dumbbell size={15} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 sm:py-28 lg:py-36 bg-black text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured Rooms & Suites
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Discover our finest accommodations designed for comfort, style, and serenity.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-20 lg:mb-24">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:bg-neutral-800/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleLike(room.id)}
                  className={`absolute top-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md ${
                    liked[room.id] ? "text-red-500" : "text-white/70"
                  } hover:scale-110 transition-all duration-300`}
                >
                  <Heart
                    size={20}
                    fill={liked[room.id] ? "currentColor" : "none"}
                  />
                </button>
                
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold">${room.price}</span>
                  <span className="text-sm text-gray-300 ml-1">/ night</span>
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {room.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize size={16} />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={16} />
                    <span>Luxury</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  {room.amenities.map((a, i) => (
                    <div
                      key={i}
                      className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors duration-300"
                      title={a}
                    >
                      {getAmenityIcon(a)}
                    </div>
                  ))}
                </div>

                <ul className="text-sm text-gray-400 space-y-2 mb-8">
                  {room.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300">
                  View Details
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-10 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300">
            Explore All Rooms
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;