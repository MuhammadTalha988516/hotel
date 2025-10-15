import React, { useRef, useEffect } from "react";
import FacilityCard from "./FacilityCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    id: 1,
    name: "Luxury Spa & Wellness",
    description: "Rejuvenate your senses with world-class massages, saunas, and aromatherapy treatments.",
    image: "https://images.pexels.com/photos/8844594/pexels-photo-8844594.jpeg",
    type: "spa",
  },
  {
    id: 2,
    name: "Infinity Rooftop Pool",
    description: "Swim under the stars with breathtaking skyline views and ambient lighting.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    type: "pool",
  },
  {
    id: 3,
    name: "Fine Dining Restaurant",
    description: "Indulge in gourmet cuisine crafted by award-winning chefs in an elegant setting.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000",
    type: "restaurant",
  },
  {
    id: 4,
    name: "Luxury Suites",
    description: "Spacious, elegant rooms featuring intelligent lighting and private balconies.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    type: "room",
  },
  {
    id: 5,
    name: "Sky Lounge & Bar",
    description: "Unwind with signature cocktails while enjoying panoramic views of the city.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000",
    type: "bar",
  },
  {
    id: 6,
    name: "Executive Meeting Rooms",
    description: "Modern business suites equipped with digital screens and conference facilities.",
    image: "https://images.pexels.com/photos/7434025/pexels-photo-7434025.jpeg",
    type: "meeting",
  },
  {
    id: 7,
    name: "Private Cinema Lounge",
    description: "Experience ultimate comfort with luxury recliners and immersive sound systems.",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1000",
    type: "tv",
  },
  {
    id: 8,
    name: "Fitness & Yoga Studio",
    description: "Stay active with top-tier equipment, yoga sessions, and personal trainers.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
    type: "gym",
  },
  {
    id: 9,
    name: "Private Garden Courtyard",
    description: "Relax in a peaceful outdoor haven surrounded by lush greenery and fountains.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    type: "garden",
  },
];

const FacilityList = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.05,
          ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-gray-950 text-white py-20 px-6 md:px-12">


      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <div key={facility.id} ref={(el) => (cardsRef.current[index] = el)}>
            <FacilityCard facility={facility} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacilityList;