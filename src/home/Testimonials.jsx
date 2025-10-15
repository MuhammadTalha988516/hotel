import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      quote:
        "The ambiance, the warmth, and the attention to detail made my stay absolutely perfect. I felt truly cared for every moment.",
    },
    {
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      quote:
        "Peaceful, elegant, and incredibly comfortable. This place feels less like a hotel and more like a personal retreat.",
    },
    {
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      quote:
        "Everything was flawless — the interiors, the hospitality, the vibe. I can't imagine staying anywhere else now.",
    },
  ];

  return (
    <section className="py-24 sm:py-28 lg:py-36 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our Guests Say
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Real voices. Genuine experiences. Discover what makes every stay
            unforgettable.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-20 lg:mb-24">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm hover:bg-neutral-800/50 hover:border-gray-700 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400/30 group-hover:border-emerald-400/60 transition-colors duration-300"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              
              <p className="text-gray-300 italic leading-relaxed mb-6 text-base sm:text-lg">
                "{t.quote}"
              </p>
              
              <h4 className="text-white font-semibold text-lg group-hover:text-emerald-300 transition-colors duration-300">
                {t.name}
              </h4>
              
              {/* Rating Stars */}
              <div className="flex items-center mt-3 space-x-1">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 bg-neutral-900 border border-neutral-800 rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1,200+</div>
              <div className="text-sm text-gray-400">Happy Guests</div>
            </div>
            <div className="w-px h-12 bg-neutral-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-neutral-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;