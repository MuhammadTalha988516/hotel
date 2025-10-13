import React from "react";
import { Dumbbell, Film, Wind, Coffee, Home, TreePalm, GlassWater, Briefcase, UtensilsCrossed } from "lucide-react";

const iconMap = {
  spa: <GlassWater className="w-6 h-6 text-cyan-400" />,
  pool: <Wind className="w-6 h-6 text-blue-400" />,
  tv: <Film className="w-6 h-6 text-purple-400" />,
  restaurant: <UtensilsCrossed className="w-6 h-6 text-amber-400" />,
  bar: <Coffee className="w-6 h-6 text-pink-400" />,
  meeting: <Briefcase className="w-6 h-6 text-green-400" />,
  room: <Home className="w-6 h-6 text-yellow-400" />,
  gym: <Dumbbell className="w-6 h-6 text-red-400" />,
  garden: <TreePalm className="w-6 h-6 text-emerald-400" />,
};

const FacilityCard = ({ facility }) => {
  const { name, description, image, type } = facility;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-transform transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover opacity-90 hover:opacity-100 transition duration-500"
        />
        <div className="absolute top-3 right-3 bg-gray-800 p-2 rounded-full shadow-lg">
          {iconMap[type] || <span className="text-gray-400">⭐</span>}
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-yellow-300 mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
      </div>
    </div>
  );
};

export default FacilityCard;
