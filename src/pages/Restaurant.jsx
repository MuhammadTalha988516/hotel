import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "../restaurant/Menu";
import Chef from "../restaurant/Chef";
import Reservations from "../restaurant/Reservations";
import CartSummary from "../restaurant/CartSummary";
import { CartProvider } from "../restaurant/CartContext";

gsap.registerPlugin(ScrollTrigger);

const Restaurant = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Restaurant Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              Flavors For You
            </h1>
            <p className="text-lg md:text-xl text-white-200 leading-relaxed">
              A luxurious dining experience blending art, taste, and ambiance —
              where every plate tells a story of passion and perfection,
              crafted to delight all your senses.
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <div className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
          <Menu />
        </div>

        
        <div className="py-10 px-6 bg-gray-800">
          <CartSummary />
        </div>

        {/* Chef Section */}
        <div className="py-20 px-6 bg-black">
          <Chef />
        </div>

        {/* Reservations Section */}
        <div className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
          <Reservations />
        </div>
      </div>
    </CartProvider>
  );
};

export default Restaurant;
