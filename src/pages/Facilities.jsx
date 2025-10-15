import React from "react";
import FacilityList from "../facilities/FacilityList";

const Facilities = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* 🔹 Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* ✅ Working Online Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Hotel Lobby"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/90 to-gray-950"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-lg">
            Facilities, We Provide
          </h1>
          <br />
      <p className="text-gray-300 text-lg md:text-xl max-w-full leading-relaxed px-6 md:px-12">
  Step into a world of elegance and comfort where the corners are
  designed to elevate your experience.
</p>




        </div>
      </section>

      {/* 🔹 Facilities Section */}
      <div className="mt-10">
        <FacilityList />
      </div>
    </div>
  );
};

export default Facilities;