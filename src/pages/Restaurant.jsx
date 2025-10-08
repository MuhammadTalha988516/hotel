import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Star, Clock, Users, Wine, ChefHat } from 'lucide-react';
import Menu from '../restaurant/Menu';
import Chef from '../restaurant/Chef';
import Reservations from '../restaurant/Reservations';

gsap.registerPlugin(ScrollTrigger);

const Restaurant = () => {
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Features stagger animation
      featuresRef.current?.forEach((feature, index) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });

      // Stats animation
      statsRef.current?.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.7)'
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Star, title: 'Award Winning', description: 'Michelin-starred cuisine' },
    { icon: Clock, title: '24/7 Service', description: 'Round-the-clock dining' },
    { icon: Users, title: 'Private Dining', description: 'Intimate dining experiences' },
    { icon: Wine, title: 'Wine Cellar', description: 'Extensive wine collection' }
  ];

  const stats = [
    { number: '50+', label: 'Signature Dishes' },
    { number: '5★', label: 'Michelin Rating' },
    { number: '24/7', label: 'Service Hours' },
    { number: '100+', label: 'Wine Selection' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="text-yellow-400 mr-3" size={60} />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Fine Dining
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Experience culinary excellence with our world-renowned chefs and exquisite cuisine
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Restaurant Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our restaurant a destination for food lovers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  ref={el => featuresRef.current[index] = el}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mx-auto mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={el => statsRef.current[index] = el}
                className="text-center"
              >
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="py-20 px-6">
        <Menu />
      </div>

      {/* Chef Section */}
      <div className="py-20 px-6 bg-gray-50">
        <Chef />
      </div>

      {/* Reservations Section */}
      <div className="py-20 px-6">
        <Reservations />
      </div>
    </div>
  );
};

export default Restaurant;
