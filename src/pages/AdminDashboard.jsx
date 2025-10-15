import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Bed,
  Settings,
  Bell,
  Search,
  Menu,
  Home,
  BarChart3,
  FileText,
  LogOut,
  User,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sidebar animation
      gsap.from(sidebarRef.current, {
        x: -300,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Main content animation
      gsap.from(mainContentRef.current, {
        x: 300,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Cards stagger animation
      cardsRef.current?.forEach((card, index) => {
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
  }, []);

  const stats = [
    {
      title: 'Total Guests',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Occupancy Rate',
      value: '87%',
      change: '-3%',
      trend: 'down',
      icon: Bed,
      color: 'orange'
    },
    {
      title: 'Bookings Today',
      value: '23',
      change: '+15%',
      trend: 'up',
      icon: Calendar,
      color: 'purple'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guest: 'Sarah Johnson',
      room: 'Deluxe Suite',
      checkIn: '2024-01-15',
      checkOut: '2024-01-17',
      status: 'confirmed',
      amount: '$299'
    },
    {
      id: 2,
      guest: 'Michael Chen',
      room: 'Executive Room',
      checkIn: '2024-01-16',
      checkOut: '2024-01-18',
      status: 'pending',
      amount: '$199'
    },
    {
      id: 3,
      guest: 'Emily Rodriguez',
      room: 'Presidential Suite',
      checkIn: '2024-01-17',
      checkOut: '2024-01-20',
      status: 'confirmed',
      amount: '$599'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const notifications = [
    { id: 1, message: 'New booking from Sarah Johnson', time: '2 min ago', type: 'booking' },
    { id: 2, message: 'Room 301 maintenance completed', time: '15 min ago', type: 'maintenance' },
    { id: 3, message: 'Payment received for booking #1234', time: '1 hour ago', type: 'payment' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-gray-900 text-white w-64 min-h-screen p-6 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 mr-3">
            <Home size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Hotel Admin</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-yellow-500 text-black'
                    : 'hover:bg-gray-800'
                }`}
              >
                <IconComponent size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {activeSection}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="relative">
                <Bell size={20} className="text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>

              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Admin"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-gray-600">Hotel Manager</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeSection === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      ref={el => cardsRef.current[index] = el}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                          <div className={`flex items-center mt-2 ${
                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="text-sm ml-1">{stat.change}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${
                          stat.color === 'blue' ? 'bg-blue-100' :
                          stat.color === 'green' ? 'bg-green-100' :
                          stat.color === 'orange' ? 'bg-orange-100' : 'bg-purple-100'
                        }`}>
                          <IconComponent size={24} className={`${
                            stat.color === 'blue' ? 'text-blue-600' :
                            stat.color === 'green' ? 'text-green-600' :
                            stat.color === 'orange' ? 'text-orange-600' : 'text-purple-600'
                          }`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Bookings and Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{booking.guest}</p>
                          <p className="text-sm text-gray-600">{booking.room}</p>
                          <p className="text-sm text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{booking.amount}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'booking' ? 'bg-blue-100' :
                          notification.type === 'maintenance' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {notification.type === 'booking' ? <Users size={16} className="text-blue-600" /> :
                           notification.type === 'maintenance' ? <CheckCircle size={16} className="text-green-600" /> :
                           <DollarSign size={16} className="text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Management</h3>
              <p className="text-gray-600">Booking management interface would go here...</p>
            </div>
          )}

          {activeSection === 'guests' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Guest Management</h3>
              <p className="text-gray-600">Guest management interface would go here...</p>
            </div>
          )}

          {activeSection === 'rooms' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Room Management</h3>
              <p className="text-gray-600">Room management interface would go here...</p>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h3>
              <p className="text-gray-600">Analytics dashboard would go here...</p>
            </div>
          )}

          {activeSection === 'reports' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Reports</h3>
              <p className="text-gray-600">Reports interface would go here...</p>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Settings</h3>
              <p className="text-gray-600">Settings interface would go here...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;