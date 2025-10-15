import React from "react";
import { Star, Award, Globe, Users, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* === Background Lights === */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-emerald-500/40 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[25rem] h-[25rem] bg-cyan-500/40 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 w-[20rem] h-[20rem] bg-violet-600/40 rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* === Main Content === */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <div className="flex flex-col items-center justify-center py-24 md:py-32 space-y-16 md:space-y-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-emerald-400/30 backdrop-blur-sm shadow-sm">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300 tracking-wide uppercase">
              Welcome to Opulent Escapes
            </span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                Discover Timeless
              </span>
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Luxury & Comfort
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-8">
              Step into a world where every moment feels bespoke — refined elegance,
              serene surroundings, and experiences crafted for those who expect more.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 pt-6">
            <button className="group relative flex items-center justify-center gap-2 px-12 sm:px-14 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.04] hover:brightness-110 transition-all duration-300">
              <span>Explore Destinations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button className="flex items-center justify-center px-10 sm:px-12 py-4 border border-white/20 bg-white/5 rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.04] transition-all duration-300">
              View Experiences
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 pt-16 md:pt-20 max-w-5xl mx-auto">
            {[
              { icon: Users, value: "500+", label: "Happy Guests" },
              { icon: Globe, value: "50+", label: "Luxury Resorts" },
              { icon: Star, value: "5.0", label: "Guest Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-emerald-500/15 mb-3 shadow-inner">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <p className="text-sm text-gray-500 pt-10 md:pt-12 max-w-xl mx-auto leading-relaxed">
            Crafted with care for the modern traveler — experience serenity in every moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;