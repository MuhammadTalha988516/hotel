import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddToCart from "./AddToCart";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { name: "Grilled Salmon", description: "Freshly grilled salmon fillet with herbs and lemon butter.", price: 25, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800" },
  { name: "Steak Deluxe", description: "Tender ribeye steak cooked to perfection with sauce.", price: 30, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800" },
  { name: "Caesar Salad", description: "Crisp romaine lettuce tossed with classic Caesar dressing.", price: 12, image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800" },
  { name: "Spaghetti Carbonara", description: "Italian pasta in creamy egg sauce with pancetta.", price: 18, image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800" },
  { name: "Gourmet Burger", description: "Angus beef patty with cheese, lettuce, and sauce.", price: 15, image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800" },
  { name: "Sushi Platter", description: "Assorted sushi rolls prepared with fresh fish and wasabi.", price: 28, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800" },
  { name: "Lobster Tail", description: "Succulent lobster tail brushed with garlic butter.", price: 35, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { name: "Margherita Pizza", description: "Wood-fired pizza with tomato, mozzarella, and basil.", price: 14, image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "French Fries", description: "Crispy golden fries served with truffle mayo.", price: 6, image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Chocolate Lava Cake", description: "Warm molten chocolate cake with vanilla ice cream.", price: 8, image: "https://images.pexels.com/photos/31683875/pexels-photo-31683875.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Fruit Tart", description: "Seasonal fruits on a creamy custard base.", price: 10, image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Pancakes", description: "Fluffy pancakes served with maple syrup and butter.", price: 9, image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Boiled Rice", description: "Boiled rice served with corma and salad", price: 5, image: "https://images.pexels.com/photos/17563535/pexels-photo-17563535.jpeg" },
  { name: "Boiled Eggs", description: "Boiled eggs served with corma and salad", price: 10, image: "https://images.pexels.com/photos/7965917/pexels-photo-7965917.jpeg" },
  { name: "Mutton", description: "Meat of goat served with bread", price: 20, image: "https://images.pexels.com/photos/18698238/pexels-photo-18698238.jpeg" }
];

const Menu = () => {
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
    <div className="max-w-7xl mx-auto -mt-10 px-4 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-transform transform hover:-translate-y-2 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">{item.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{item.description}</p>
              <span className="text-lg font-bold text-yellow-400 mb-4">${item.price}</span>
              <AddToCart name={item.name} price={item.price} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;