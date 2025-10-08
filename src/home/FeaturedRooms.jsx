import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, Users, Maximize, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedRooms = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const roomsRef = useRef([]);

  const featuredRooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      price: 299,
      capacity: 2,
      size: '45 m²',
      rating: 4.9,
      features: ['King Bed', 'Ocean View', 'Private Balcony']
    },
    {
      id: 2,
      name: 'Presidential Suite',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      price: 599,
      capacity: 4,
      size: '85 m²',
      rating: 5.0,
      features: ['Master Bedroom', 'Living Room', 'Jacuzzi']
    },
    {
      id: 3,
      name: 'Executive Room',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      price: 199,
      capacity: 2,
      size: '35 m²',
      rating: 4.8,
      features: ['Queen Bed', 'Work Desk', 'City View']
    }
  ];

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

      // Room cards animation
      roomsRef.current.forEach((room, index) => {
        gsap.from(room, {
          scrollTrigger: {
            trigger: room,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 100,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="featured-rooms-section">
      <div className="featured-rooms-container">
        <div ref={titleRef} className="featured-rooms-header">
          <h2 className="featured-rooms-title">Signature Accommodations</h2>
          <p className="featured-rooms-subtitle">
            Discover our most exclusive rooms designed for ultimate comfort
          </p>
        </div>

        <div className="featured-rooms-grid">
          {featuredRooms.map((room, index) => (
            <div
              key={room.id}
              ref={el => roomsRef.current[index] = el}
              className="featured-room-card"
            >
              <div className="room-image-wrapper">
                <img src={room.image} alt={room.name} className="room-image" />
                <div className="room-price-badge">
                  <span className="price-amount">${room.price}</span>
                  <span className="price-period">/night</span>
                </div>
                <div className="room-rating-badge">
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span>{room.rating}</span>
                </div>
              </div>

              <div className="room-content">
                <h3 className="room-name">{room.name}</h3>
                
                <div className="room-specs">
                  <div className="room-spec">
                    <Users size={18} />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="room-spec">
                    <Maximize size={18} />
                    <span>{room.size}</span>
                  </div>
                  <div className="room-spec">
                    <Bed size={18} />
                    <span>Luxury Bed</span>
                  </div>
                </div>

                <div className="room-features">
                  {room.features.map((feature, idx) => (
                    <span key={idx} className="room-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="room-book-button">
                  <span>View Details</span>
                  <ArrowRight size={18} className="button-arrow" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-rooms">
          <button className="view-all-button">
            Explore All Rooms
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRooms;
