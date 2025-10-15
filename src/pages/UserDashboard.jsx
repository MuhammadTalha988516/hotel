
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  User,
  Calendar,
  Edit,
  Settings,
  Bell,
  Search,
  Star,
  Plus,
  Filter,
  Download,
  Share,
  Camera,
  CreditCard
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const mainContentRef = useRef(null);
  const cardsRef = useRef([]);
  const tabsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.from(mainContentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Tabs animation
      tabsRef.current.forEach((tab, index) => {
        gsap.from(tab, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    });

    return () => ctx.revert();
  }, [activeTab]);

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2023',
    totalBookings: 12,
    loyaltyPoints: 2840,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
  };

  const bookings = [
    {
      id: 1,
      hotel: 'Luxury Grand Hotel',
      room: 'Deluxe Suite',
      checkIn: '2024-01-15',
      checkOut: '2024-01-17',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80',
      price: '$299',
      amenities: ['Free WiFi', 'Pool Access', 'Room Service']
    },
    {
      id: 2,
      hotel: 'Business Central Hotel',
      room: 'Executive Room',
      checkIn: '2024-02-10',
      checkOut: '2024-02-12',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
      price: '$199',
      amenities: ['Business Center', 'Gym Access', 'Valet Parking']
    },
    {
      id: 3,
      hotel: 'Seaside Resort',
      room: 'Ocean View Suite',
      checkIn: '2024-03-05',
      checkOut: '2024-03-08',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
      price: '$449',
      amenities: ['Ocean View', 'Spa Access', 'Restaurant']
    }
  ];

  const loyaltyRewards = [
    { id: 1, title: 'Free Spa Session', points: 500, claimed: false },
    { id: 2, title: 'Room Upgrade', points: 1000, claimed: false },
    { id: 3, title: 'Complimentary Dinner', points: 1500, claimed: true },
    { id: 4, title: 'Airport Transfer', points: 800, claimed: false }
  ];

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'rewards', label: 'Loyalty Rewards', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64"
                />
              </div>

              <div className="relative">
                <Bell size={20} className="text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </div>

              <div className="flex items-center">
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{userProfile.name}</p>
                  <p className="text-sm text-gray-600">{userProfile.loyaltyPoints} points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={userProfile.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 hover:bg-yellow-600 transition-colors">
                    <Camera size={16} className="text-white" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{userProfile.name}</h3>
                <p className="text-gray-600 mb-4">{userProfile.email}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-semibold">{userProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-semibold">{userProfile.totalBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Loyalty Points:</span>
                    <span className="font-semibold text-yellow-600">{userProfile.loyaltyPoints}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {tabs.map((tab, index) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    ref={el => tabsRef.current[index] = el}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center p-4 text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-yellow-50 border-r-4 border-yellow-500 text-yellow-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <IconComponent size={20} className="mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div ref={mainContentRef} className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center">
                    <Plus size={20} className="mr-2" />
                    New Booking
                  </button>
                </div>

                <div className="grid gap-6">
                  {bookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      ref={el => cardsRef.current[index] = el}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-4 md:mb-0">
                          <img
                            src={booking.image}
                            alt={booking.hotel}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>

                        <div className="md:w-2/3 md:pl-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.hotel}</h3>
                              <p className="text-gray-600 mb-2">{booking.room}</p>
                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <Calendar size={16} className="mr-1" />
                                <span>{booking.checkIn} - {booking.checkOut}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-800 mb-1">{booking.price}</p>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                            <div className="flex flex-wrap gap-2">
                              {booking.amenities.map((amenity, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                              View Details
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                              Modify
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Details</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={userProfile.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={userProfile.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={userProfile.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                      Update Profile
                    </button>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Preferences</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Marketing Updates</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Loyalty Rewards</h2>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg">
                    {userProfile.loyaltyPoints} Points
                  </div>
                </div>

                <div className="grid gap-6">
                  {loyaltyRewards.map((reward, index) => (
                    <div
                      key={reward.id}
                      ref={el => cardsRef.current[index] = el}
                      className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                        reward.claimed ? 'border-gray-200 opacity-60' : 'border-yellow-200 hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-full mr-4 ${
                            reward.claimed ? 'bg-gray-100' : 'bg-yellow-100'
                          }`}>
                            <Star size={24} className={`${
                              reward.claimed ? 'text-gray-400' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold ${
                              reward.claimed ? 'text-gray-500' : 'text-gray-800'
                            }`}>
                              {reward.title}
                            </h3>
                            <p className={`text-sm ${
                              reward.claimed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {reward.points} points required
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {reward.claimed ? (
                            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
                              Claimed
                            </span>
                          ) : (
                            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                              Claim
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <button className="text-yellow-600 hover:text-yellow-700">
                      <Edit size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">Payment Methods</h3>
                      <p className="text-sm text-gray-600">Manage your saved payment methods</p>
                    </div>
                    <button className="text-yellow-600 hover:text-yellow-700">
                      <CreditCard size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">Privacy Settings</h3>
                      <p className="text-sm text-gray-600">Control your privacy preferences</p>
                    </div>
                    <button className="text-yellow-600 hover:text-yellow-700">
                      <Settings size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
