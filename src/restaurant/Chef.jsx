import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Chef = () => {
  const chefRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chefRef.current, {
        scrollTrigger: {
          trigger: chefRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={chefRef}
      className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-gray-900 rounded-2xl shadow-lg p-10"
    >
      <img
        src="https://images.pexels.com/photos/7020291/pexels-photo-7020291.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Head Chef"
        className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-xl"
      />
      <div ref={infoRef} className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
          Meet Our Head Chef
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          <span className="text-white font-semibold">Chef Alessandro Russo</span>{" "}
          brings over 20 years of culinary expertise from Michelin-starred
          kitchens around the world. His philosophy blends artistry with
          authentic flavor — transforming every plate into a masterpiece.
        </p>
      </div>
    </div>
  );
};

export default Chef;
