import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Reservations = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 90%",
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
    <div
      ref={formRef}
      className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Make a Reservation
      </h2>
      <form className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 font-semibold text-gray-200 uppercase text-sm"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-700 bg-black text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="mb-2 font-semibold text-gray-200 uppercase text-sm"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-700 bg-black text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="time"
            className="mb-2 font-semibold text-gray-200 uppercase text-sm"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            className="border border-gray-700 bg-black text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="guests"
            className="mb-2 font-semibold text-gray-200 uppercase text-sm"
          >
            Guests
          </label>
          <input
            type="number"
            id="guests"
            min="1"
            className="border border-gray-700 bg-black text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-md"
          >
            Book a Table
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservations;
