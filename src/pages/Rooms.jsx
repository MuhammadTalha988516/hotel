import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, Star, Users, Maximize, Wifi, Car, Waves, ArrowRight } from 'lucide-react';
import { ApiService } from '../services/ApiService';

gsap.registerPlugin(ScrollTrigger);

const Rooms = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const roomsGridRef = useRef(null);

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

      // Filters animation
      gsap.from(filtersRef.current, {
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
      });

      // Rooms grid animation
      gsap.from(roomsGridRef.current?.children || [], {
        scrollTrigger: {
          trigger: roomsGridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState(500);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await ApiService.getAllRooms();
        setAllRooms(rooms);
        setFilteredRooms(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedType, priceRange, allRooms]);

  const handleSearch = async () => {
    if (!allRooms.length) return;

    let filtered = allRooms;

    if (searchTerm) {
      filtered = await ApiService.searchRooms(searchTerm);
    }

    if (selectedType) {
      filtered = filtered.filter(room => room.type === selectedType);
    }

    filtered = filtered.filter(room => room.price <= priceRange);

    setFilteredRooms(filtered);
  };

  const handleRoomSelect = (room) => {
    // For now, just log the selected room
    console.log('Selected room:', room);
    // You can implement navigation to room details page here
  };

  const roomTypes = [
    { id: 1, name: 'Luxury Suites', count: 12, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80' },
    { id: 2, name: 'Deluxe Rooms', count: 25, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80' },
    { id: 3, name: 'Standard Rooms', count: 18, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80' },
    { id: 4, name: 'Executive Suites', count: 8, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading rooms...</div>
      </div>
    );
  }

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
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Our Rooms
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Discover your perfect sanctuary from our collection of luxurious accommodations
          </p>
        </div>
      </div>

      {/* Room Types Overview */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Choose Your Perfect Room
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each room is thoughtfully designed to provide the ultimate comfort and luxury experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {roomTypes.map((type, index) => (
              <div
                key={type.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{type.name}</h3>
                    <p className="text-sm opacity-90">{type.count} rooms available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div ref={filtersRef} className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Single Room">Single Room</option>
                <option value="Double Room">Double Room</option>
                <option value="Suite">Suite</option>
              </select>

              <div className="px-4 py-3">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>$50</span>
                  <span>${priceRange}</span>
                  <span>$500</span>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <Filter size={20} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={roomsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                onClick={() => handleRoomSelect(room)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-gray-800 font-semibold">${room.price}/night</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{room.type}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{room.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users size={18} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">2 Guests</span>
                      </div>
                      <div className="flex items-center">
                        <Maximize size={18} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">25 m²</span>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center">
                      <span>Book Now</span>
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Room Amenities</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
              { icon: Car, title: 'Valet Parking', description: 'Complimentary service' },
              { icon: Waves, title: 'Spa Access', description: 'Luxury spa facilities' },
              { icon: Users, title: 'Room Service', description: '24/7 availability' }
            ].map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 mx-auto mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{amenity.title}</h3>
                  <p className="text-gray-300">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Reserve your perfect room now and experience luxury like never before
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center mx-auto">
            <span>Book Now</span>
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
