import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronDown, Calendar, Users } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated overlay entrance
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });

      // Title animation - split text effect
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      // Button animation with bounce
      gsap.from(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.9
      });

      // Stats animation
      statsRef.current?.forEach((stat, index) => {
        gsap.from(stat, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 1.2 + index * 0.1
        });
      });

      // Floating animation for sparkles
      gsap.to('.sparkle', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: 0.3,
        repeat: -1,
        yoyo: true
      });

      // Parallax scroll effect
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 200,
        ease: 'none'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="hero-container">
      <div 
        ref={heroRef}
        className="hero-background"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`
        }}
      />
      
      <div ref={overlayRef} className="hero-overlay" />
      
      <div className="hero-content-wrapper">
        <div className="sparkle sparkle-1">
          <Sparkles size={24} color="#FFD700" />
        </div>
        <div className="sparkle sparkle-2">
          <Sparkles size={32} color="#FFD700" />
        </div>
        <div className="sparkle sparkle-3">
          <Sparkles size={20} color="#FFD700" />
        </div>

        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            Experience Luxury
            <span className="hero-title-accent"> Redefined</span>
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            Immerse yourself in unparalleled comfort and elegance at our world-class hotel
          </p>
          
          <button ref={buttonRef} className="hero-button" onClick={scrollToContent}>
            <span>Discover Your Stay</span>
            <ChevronDown className="button-icon" size={20} />
          </button>

          <div className="hero-stats">
            <div 
              ref={el => statsRef.current[0] = el}
              className="stat-item"
            >
              <Calendar size={24} />
              <div>
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Guests</div>
              </div>
            </div>
            
            <div 
              ref={el => statsRef.current[1] = el}
              className="stat-item"
            >
              <Users size={24} />
              <div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Luxury Rooms</div>
              </div>
            </div>
            
            <div 
              ref={el => statsRef.current[2] = el}
              className="stat-item"
            >
              <Sparkles size={24} />
              <div>
                <div className="stat-number">5★</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToContent}>
        <ChevronDown size={32} className="bounce-arrow" />
      </div>
    </div>
  );
};

export default Hero;
