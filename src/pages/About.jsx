import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, Users, Award, MapPin, Calendar } from 'lucide-react';
import Story from '../about/Story';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const valuesRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        ease: 'power3.out'
      });

      // Stats animation
      statsRef.current?.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
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

      // Values animation
      valuesRef.current?.forEach((value, index) => {
        gsap.from(value, {
          scrollTrigger: {
            trigger: value,
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

      // Image parallax effect
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Guests' },
    { icon: Award, number: '5★', label: 'Rating' },
    { icon: Calendar, number: '25+', label: 'Years of Excellence' },
    { icon: Heart, number: '100%', label: 'Guest Satisfaction' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Exceptional Service',
      description: 'We go above and beyond to ensure every guest feels valued and cared for.'
    },
    {
      icon: Star,
      title: 'Luxury Redefined',
      description: 'Every detail is crafted to provide an unforgettable luxury experience.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized globally for our commitment to excellence and innovation.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Crafting unforgettable experiences since 2000
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="text-center group"
                >
                  <div className="bg-white rounded-full p-6 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <IconComponent size={40} className="text-yellow-500 mx-auto" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Story />
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  ref={el => valuesRef.current[index] = el}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 w-fit mx-auto mb-6">
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed opacity-90">
            To create extraordinary experiences that exceed expectations, foster lasting memories,
            and set new standards in luxury hospitality. We believe that every guest deserves
            to feel like royalty, and every stay should be a celebration of life's finest moments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
