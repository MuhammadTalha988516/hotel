import React from "react";

export default function Rbanner() {
  return (
    <div className="relative h-[100vh] bg-[url('/images/room-banner.jpg')] bg-cover bg-center flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Text content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
          Our Rooms
        </h1>
        <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
          Discover your perfect sanctuary from our collection of luxurious accommodations
        </p>
      </div>
    </div>
  );
}
