import React from "react";
import {
  Wifi,
  Dumbbell,
  Utensils,
  Car,
  Waves,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Wifi,
      title: "High-Speed WiFi",
      description:
        "Ultra-fast fiber optic internet access throughout the property.",
      stats: "1 Gbps",
    },
    {
      id: 2,
      icon: Utensils,
      title: "Gourmet Dining",
      description: "World-class cuisine curated by our award-winning chefs.",
      stats: "5 Star Rated",
    },
    {
      id: 3,
      icon: Dumbbell,
      title: "Fitness Center",
      description:
        "State-of-the-art equipment and personal training available 24/7.",
      stats: "Open 24 Hours",
    },
    {
      id: 4,
      icon: Waves,
      title: "Spa & Infinity Pool",
      description:
        "Relax and rejuvenate with panoramic ocean views and signature spa treatments.",
      stats: "Premium Access",
    },
    {
      id: 5,
      icon: Car,
      title: "Valet Parking",
      description:
        "Complimentary luxury vehicle service and on-demand valet parking.",
      stats: "On Demand",
    },
    {
      id: 6,
      icon: Shield,
      title: "24/7 Security",
      description:
        "Professional on-site security team ensuring total peace of mind.",
      stats: "Expert Team",
    },
  ];

  return (
    <section className="py-24 sm:py-28 lg:py-36 bg-black text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-gray-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Premium Services
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Exceptional Experiences, Seamlessly Delivered
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Discover thoughtful amenities and bespoke services designed for
            comfort, convenience, and luxury.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 text-left mb-20 lg:mb-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 hover:border-gray-700 hover:bg-neutral-800/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <span className="text-sm text-gray-300 bg-neutral-800 px-3 py-2 rounded-full">
                    {service.stats}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;