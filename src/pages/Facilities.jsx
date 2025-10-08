import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dumbbell, Waves, Briefcase, Utensils, Car, Wifi, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Facilities = () => {
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const facilities = [
    {
      id: 1,
      name: 'State-of-the-Art Gym',
      description: '24/7 access to premium fitness equipment with personal trainer available',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      icon: Dumbbell,
      features: ['Personal Training', 'Modern Equipment', 'Group Classes']
    },
    {
      id: 2,
      name: 'Luxury Spa',
      description: 'Rejuvenate your senses with our world-class spa treatments and therapies',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      icon: Waves,
      features: ['Massage Therapy', 'Sauna & Steam', 'Beauty Treatments']
    },
    {
      id: 3,
      name: 'Business Center',
      description: 'Fully equipped business center with meeting rooms and conference facilities',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      icon: Briefcase,
      features: ['Meeting Rooms', 'High-Speed Internet', 'Printing Services']
    },
    {
      id: 4,
      name: 'Fine Dining Restaurant',
      description: 'Award-winning cuisine with international and local specialties',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      icon: Utensils,
      features: ['Fine Dining', 'Wine Cellar', 'Private Dining']
    },
    {
      id: 5,
      name: 'Valet Parking',
      description: 'Complimentary valet service ensuring convenience for all our guests',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
      icon: Car,
      features: ['24/7 Service', 'Secure Parking', 'Car Wash']
    },
    {
      id: 6,
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the entire property',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      icon: Wifi,
      features: ['Unlimited Access', 'Business Support', 'Multiple Devices']
    }
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
            backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-yellow-400 mr-3" size={50} />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Premium Facilities
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Experience world-class amenities designed for your comfort and convenience
          </p>
        </div>
      </div>

      {/* Quick Access Icons */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div
                  key={facility.id}
                  ref={el => cardsRef.current[index] = el}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
                    {facility.name.split(' ')[0]}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Discover Our Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each facility is carefully designed to provide you with the ultimate luxury experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div
                  key={facility.id}
                  ref={el => cardsRef.current[index + 6] = el}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <IconComponent size={24} className="text-gray-800" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <button className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your stay now and discover all our premium facilities firsthand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              Book Now
            </button>
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
              Virtual Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
