import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Executive',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      quote: 'An absolutely stunning experience! The attention to detail and exceptional service made our stay unforgettable. The rooms are luxurious and the staff goes above and beyond.',
      rating: 5,
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Travel Blogger',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      quote: 'I\'ve stayed at countless hotels around the world, but this one stands out. The perfect blend of modern amenities and timeless elegance. Highly recommended!',
      rating: 5,
      location: 'Singapore'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      quote: 'From the moment we arrived, we felt like royalty. The spa facilities are world-class and the restaurant serves the most exquisite cuisine. A true 5-star experience!',
      rating: 5,
      location: 'Barcelona, Spain'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Photographer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      quote: 'The architecture and interior design are breathtaking. Every corner is Instagram-worthy! But beyond aesthetics, the comfort and hospitality are unmatched.',
      rating: 5,
      location: 'London, UK'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div ref={sectionRef} className="testimonials-section">
      <div className="testimonials-container">
        <div ref={titleRef} className="testimonials-header">
          <h2 className="testimonials-title">Guest Experiences</h2>
          <p className="testimonials-subtitle">
            Hear what our valued guests have to say about their stay
          </p>
        </div>

        <div ref={carouselRef} className="testimonials-carousel">
          <button 
            className="carousel-button carousel-button-prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonial-card-main">
            <div className="quote-icon-wrapper">
              <Quote size={48} className="quote-icon" />
            </div>

            <div className="testimonial-rating">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
              ))}
            </div>

            <p className="testimonial-quote">
              "{currentTestimonial.quote}"
            </p>

            <div className="testimonial-author">
              <img 
                src={currentTestimonial.image} 
                alt={currentTestimonial.name}
                className="author-image"
              />
              <div className="author-info">
                <h4 className="author-name">{currentTestimonial.name}</h4>
                <p className="author-role">{currentTestimonial.role}</p>
                <p className="author-location">{currentTestimonial.location}</p>
              </div>
            </div>
          </div>

          <button 
            className="carousel-button carousel-button-next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
