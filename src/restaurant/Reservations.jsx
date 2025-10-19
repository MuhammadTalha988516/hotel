import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Calendar, Clock, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Reservations = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();
    const finalData = { ...formData, currentDate, currentTime };
    setSubmittedData(finalData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6">
      <div
        ref={formRef}
        className="relative max-w-5xl mx-auto bg-[#0f172a] text-white p-14 rounded-3xl shadow-2xl border-l-[10px] border-r-[10px] border-yellow-500"
      >
        {/* Title */}
        <h2 className="text-5xl font-bold text-yellow-400 mb-12 text-center tracking-wide">
          Make a Reservation
        </h2>
        <br />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-12 md:grid-cols-2 justify-center"
        >
          {/* Name */}
          <div className="flex flex-col items-start translate-x-8 md:translate-x-12">
            <label
              htmlFor="name"
              className="mb-2 font-semibold text-yellow-400 uppercase text-sm"
            >
              Name
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-5 border border-gray-700 w-96 hover:border-yellow-400 transition">
              <User size={20} className="text-yellow-400 mr-3" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-transparent text-white p-4 w-full text-lg focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="date"
              className="mb-2 font-semibold text-yellow-400 uppercase text-sm"
            >
              Reservation Date
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-5 border border-gray-700 w-96 hover:border-yellow-400 transition">
              <Calendar size={20} className="text-yellow-400 mr-3" />
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-transparent text-white p-4 w-full text-lg focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col items-start translate-x-8 md:translate-x-12">
            <label
              htmlFor="time"
              className="mb-2 font-semibold text-yellow-400 uppercase text-sm"
            >
              Reservation Time
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-5 border border-gray-700 w-96 hover:border-yellow-400 transition">
              <Clock size={20} className="text-yellow-400 mr-3" />
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-transparent text-white p-4 w-full text-lg focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="guests"
              className="mb-2 font-semibold text-yellow-400 uppercase text-sm"
            >
              Guests
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-5 border border-gray-700 w-96 hover:border-yellow-400 transition">
              <Users size={20} className="text-yellow-400 mr-3" />
              <input
                type="number"
                id="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Number of guests"
                className="bg-transparent text-white p-4 w-full text-lg focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-16 rounded-full text-lg border-2 border-yellow-500 hover:border-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-500/40"
            >
              Book a Table
            </button>
          </div>
        </form>

        {/* Success Message */}
        {submitted && submittedData && (
          <div className="mt-12 bg-green-700/80 text-white p-6 rounded-xl text-center shadow-lg">
            <p className="font-semibold text-lg">
              Reservation Confirmed for {submittedData.name}!
            </p>
            <p className="text-sm mt-1">
              Reservation Date: {submittedData.date} at {submittedData.time}
            </p>
            <p className="text-sm mt-1">
              Submitted on {submittedData.currentDate} at{" "}
              {submittedData.currentTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
