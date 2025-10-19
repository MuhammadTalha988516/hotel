import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddToCart from "./AddToCart";

gsap.registerPlugin(ScrollTrigger);

// 🍴 Full Restaurant Menu
const menuItems = [
  // Appetizers
  { name: "French Fries", description: "Crispy golden fries served with truffle mayo.", price: 6, image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg" },
  { name: "Garlic Bread", description: "Toasted garlic bread topped with butter and herbs.", price: 7, image: "https://images.pexels.com/photos/34349107/pexels-photo-34349107.jpeg" },
  { name: "Cheese Balls", description: "Crispy fried cheese balls with spicy dip.", price: 8, image: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg" },
  { name: "Chicken Nuggets", description: "Crispy chicken nuggets served with BBQ sauce.", price: 10, image: "https://images.pexels.com/photos/4109268/pexels-photo-4109268.jpeg" },
  { name: "Seekh Kebab", description: "Juicy seekh kebabs made from minced meat and spices.", price: 14, image: "https://images.pexels.com/photos/1618913/pexels-photo-1618913.jpeg" },
  
  // BBQ & Desi
  { name: "Chicken Tikka", description: "Spicy grilled chicken tikka with mint chutney.", price: 18, image: "https://images.pexels.com/photos/29699526/pexels-photo-29699526.jpeg" },
  { name: "Mutton Karahi", description: "Traditional mutton karahi cooked with desi spices.", price: 28, image: "https://images.pexels.com/photos/9609841/pexels-photo-9609841.jpeg" },
  { name: "Chicken Biryani", description: "Traditional spicy chicken biryani served with raita.", price: 15, image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg" },
  { name: "Mutton Biryani", description: "Aromatic mutton biryani with fried onions and raita.", price: 20, image: "https://images.pexels.com/photos/9609846/pexels-photo-9609846.jpeg" },
  { name: "BBQ Platter", description: "Mixed BBQ platter with kebabs, chicken tikka, and naan.", price: 30, image: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg" },
  
  // Burgers & Sandwiches
  { name: "Zinger Burger", description: "Crispy chicken zinger burger with mayo and lettuce.", price: 17, image: "https://cdn.pixabay.com/photo/2024/03/01/11/08/ai-generated-8606255_1280.jpg" },
  { name: "Beef Burger", description: "Juicy beef burger with cheese, tomato, and lettuce.", price: 18, image: "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg" },
  { name: "Club Sandwich", description: "Triple-layer club sandwich with fries and coleslaw.", price: 14, image: "https://images.pexels.com/photos/15362507/pexels-photo-15362507.jpeg" },
  { name: "Cheese Sandwich", description: "Grilled cheese sandwich with tomato and herbs.", price: 8, image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg" },
  { name: "Shawarma Roll", description: "Lebanese shawarma roll with garlic sauce and fries.", price: 12, image: "https://images.pexels.com/photos/6416559/pexels-photo-6416559.jpeg" },

  // Continental
  { name: "Grilled Salmon", description: "Freshly grilled salmon fillet with herbs and lemon butter.", price: 25, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800" },
  { name: "Steak Deluxe", description: "Tender ribeye steak cooked to perfection with sauce.", price: 30, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800" },
  { name: "Lobster Tail", description: "Succulent lobster tail brushed with garlic butter.", price: 35, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { name: "Prawn Curry", description: "Delicious prawn curry cooked in coconut gravy.", price: 26, image: "https://images.pexels.com/photos/27039838/pexels-photo-27039838.jpeg" },
  { name: "Fish Fry", description: "Crispy fried fish served with lemon and tartar sauce.", price: 24, image: "https://images.pexels.com/photos/10432706/pexels-photo-10432706.jpeg" },

  // Pizza & Pasta
  { name: "Margherita Pizza", description: "Classic margherita pizza with mozzarella and basil.", price: 21, image: "https://images.pexels.com/photos/34322095/pexels-photo-34322095.jpeg" },
  { name: "Vegetable Pizza", description: "Cheesy pizza topped with olives and peppers.", price: 22, image: "https://images.pexels.com/photos/4109083/pexels-photo-4109083.jpeg" },
  { name: "Spaghetti Carbonara", description: "Italian pasta in creamy egg sauce with pancetta.", price: 18, image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800" },
  { name: "Pasta Alfredo", description: "Creamy Alfredo pasta with mushrooms and chicken.", price: 20, image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" },

  // Desserts
  { name: "Chocolate Lava Cake", description: "Warm molten chocolate cake with ice cream.", price: 8, image: "https://images.pexels.com/photos/31683875/pexels-photo-31683875.jpeg" },
  { name: "Ice Cream Sundae", description: "Vanilla ice cream topped with chocolate syrup and nuts.", price: 12, image: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg" },
  { name: "Fruit Tart", description: "Seasonal fruits on a creamy custard base.", price: 10, image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg" },
  { name: "Chocolate Brownie", description: "Soft chocolate brownie served with ice cream.", price: 9, image: "https://images.pexels.com/photos/5386673/pexels-photo-5386673.jpeg" },

  // Drinks
  { name: "Mango Smoothie", description: "Fresh mango smoothie with ice cream topping.", price: 10, image: "https://images.pexels.com/photos/4955257/pexels-photo-4955257.jpeg" },
  { name: "Cold Coffee", description: "Chilled creamy cold coffee with whipped cream.", price: 9, image: "https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg" },
  { name: "Strawberry Milkshake", description: "Fresh strawberry milkshake with whipped cream.", price: 10, image: "https://images.pexels.com/photos/2424832/pexels-photo-2424832.jpeg" },
  { name: "Fresh Lime Soda", description: "Refreshing soda with lime and mint.", price: 5, image: "https://images.pexels.com/photos/2824007/pexels-photo-2824007.jpeg" },
];

const Menu = () => {
  const [search, setSearch] = useState("");
  const cardsRef = useRef([]);

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="max-w-7xl mx-auto px-4 text-center relative">
      {/* 🔍 Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-32 w-full sm:w-2/3 lg:w-1/2 z-20">
        <input
          type="text"
          placeholder="🔍 Search your favorite dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-yellow-400 rounded-full px-6 py-3 text-lg text-white bg-black/70 placeholder-yellow-400 font-semibold focus:outline-none"
        />
      </div>

      {/* 🍽️ Menu Grid */}
      <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-transform transform hover:-translate-y-2 flex flex-col"
          >
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
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
