import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, Dumbbell, Utensils, Car, Waves, Sparkles, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 1,
      icon: Wifi,
      title: 'Free WiFi',
      description: 'High-speed internet access throughout the property',
      color: '#3B82F6'
    },
    {
      id: 2,
      icon: Utensils,
      title: 'Fine Dining',
      description: 'World-class cuisine from our award-winning chefs',
      color: '#EF4444'
    },
    {
      id: 3,
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment available 24/7',
      color: '#10B981'
    },
    {
      id: 4,
      icon: Waves,
      title: 'Spa & Pool',
      description: 'Relax and rejuvenate in our luxury spa and pool',
      color: '#06B6D4'
    },
    {
      id: 5,
      icon: Car,
      title: 'Valet Parking',
      description: 'Complimentary valet service for all guests',
      color: '#8B5CF6'
    },
    {
      id: 6,
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security for your peace of mind',
      color: '#F59E0B'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="services-section">
      <div className="services-container">
        <div ref={titleRef} className="services-header">
          <Sparkles className="header-icon" size={40} />
          <h2 className="services-title">Premium Amenities</h2>
          <p className="services-subtitle">
            Experience world-class facilities designed for your comfort
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                ref={el => cardsRef.current[index] = el}
                className="service-card"
              >
                <div className="service-card-inner">
                  <div 
                    className="service-icon-wrapper"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <IconComponent 
                      size={32} 
                      color={service.color}
                      className="service-icon"
                    />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-hover-overlay" style={{ backgroundColor: service.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
