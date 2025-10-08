import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const storyRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={storyRef} className="grid md:grid-cols-2 gap-12 items-center">
      <div ref={textRef} className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Our Journey
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Founded in 2000, our hotel began as a dream to create the perfect blend of luxury,
          comfort, and exceptional service. What started as a small boutique hotel has grown
          into a world-renowned destination, welcoming guests from every corner of the globe.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Every corner of our establishment tells a story of dedication, passion, and an
          unwavering commitment to excellence. From our meticulously designed rooms to our
          award-winning culinary experiences, we strive to create moments that linger in
          the hearts of our guests long after they depart.
        </p>
        <div className="flex items-center space-x-4 pt-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">25</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Years of Excellence</h3>
            <p className="text-gray-600">Serving guests with distinction</p>
          </div>
        </div>
      </div>

      <div ref={imageRef} className="relative">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
            alt="Hotel Story"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
          <span className="text-2xl">🏨</span>
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
          <span className="text-white text-xl">✨</span>
        </div>
      </div>
    </div>
  );
};

export default Story;
