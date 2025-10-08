import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home,
  Heart,Star,Award,Phone,Mail,MapPin,Clock,Facebook,Twitter,Instagram,Youtube,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      sectionsRef.current.forEach((section, index) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Star },
    { name: 'Rooms', path: '/rooms', icon: Home },
    { name: 'Facilities', path: '/facilities', icon: Award },
    { name: 'Restaurant', path: '/restaurant', icon: Heart }
  ];

  const services = [
    'Room Booking',
    'Event Planning',
    'Spa Services',
    'Airport Transfer',
    'Concierge Service',
    'Business Center'
  ];

  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'info@luxestay.com' },
    { icon: MapPin, text: '123 Luxury Ave, Paradise City' },
    { icon: Clock, text: '24/7 Customer Support' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Youtube, url: '#', label: 'YouTube' }
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div ref={el => sectionsRef.current[0] = el} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 mr-3">
                <Home className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">LuxeStay</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience luxury redefined with our world-class hospitality services.
              We create unforgettable moments for every guest who walks through our doors.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="bg-gray-800 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={el => sectionsRef.current[1] = el}>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                    >
                      <IconComponent size={16} className="mr-3" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div ref={el => sectionsRef.current[2] = el}>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={el => sectionsRef.current[3] = el}>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start">
                    <IconComponent size={20} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{info.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Phone size={18} className="mr-2" />
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div ref={el => sectionsRef.current[4] = el} className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-r-lg hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 LuxeStay Hotel. All rights reserved.
            </p>

            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-400 text-sm mr-4">Made with</span>
              <Heart className="text-red-500 mx-1" size={16} />
              <span className="text-gray-400 text-sm ml-1">for luxury hospitality</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
