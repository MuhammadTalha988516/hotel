import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  CreditCard, 
  Settings, 
  Bell,
  Heart,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  const userBookings = [
    {
      id: 1,
      hotel: 'Ocean View Suite',
      location: 'Maldives',
      checkIn: '2025-01-15',
      checkOut: '2025-01-20',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80'
    },
    {
      id: 2,
      hotel: 'Mountain Retreat',
      location: 'Switzerland',
      checkIn: '2025-02-10',
      checkOut: '2025-02-15',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'
    }
  ];

  const adminStats = [
    { icon: Users, label: 'Total Users', value: '2,847', change: '+12%' },
    { icon: Calendar, label: 'Bookings Today', value: '156', change: '+8%' },
    { icon: TrendingUp, label: 'Revenue', value: '$45,230', change: '+15%' },
    { icon: Star, label: 'Avg Rating', value: '4.9', change: '+0.2' }
  ];

  const recentActivities = [
    { action: 'New booking', details: 'Ocean View Suite - John Doe', time: '2 hours ago' },
    { action: 'Review submitted', details: '5-star review for Mountain Retreat', time: '4 hours ago' },
    { action: 'Payment received', details: '$2,450 from booking #1234', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-2 border-emerald-400"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-400">
                {isAdmin ? 'Admin Dashboard' : 'Manage your bookings and preferences'}
              </p>
            </div>
          </div>
          
          {isAdmin && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Administrator</span>
            </div>
          )}
        </div>

        {isAdmin ? (
          // Admin Dashboard
          <>
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminStats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                      <stat.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.details}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-left">
                <Users className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Manage Users</h3>
                <p className="text-gray-400 text-sm">View and manage user accounts</p>
              </button>
              
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-left">
                <Calendar className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Bookings</h3>
                <p className="text-gray-400 text-sm">Manage all hotel bookings</p>
              </button>
              
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-left">
                <Settings className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Settings</h3>
                <p className="text-gray-400 text-sm">Configure system settings</p>
              </button>
            </div>
          </>
        ) : (
          // User Dashboard
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">2</h3>
                    <p className="text-gray-400">Active Bookings</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Heart className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">5</h3>
                    <p className="text-gray-400">Favorite Hotels</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">4.8</h3>
                    <p className="text-gray-400">Avg Rating Given</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Bookings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">My Bookings</h2>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                  New Booking
                </button>
              </div>
              
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <img
                      src={booking.image}
                      alt={booking.hotel}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{booking.hotel}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-center">
                <Calendar className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Book Now</h3>
                <p className="text-gray-400 text-sm">Find your perfect stay</p>
              </button>
              
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-center">
                <Heart className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Favorites</h3>
                <p className="text-gray-400 text-sm">Your saved hotels</p>
              </button>
              
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-center">
                <CreditCard className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Payments</h3>
                <p className="text-gray-400 text-sm">Manage payment methods</p>
              </button>
              
              <button className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-center">
                <Settings className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Settings</h3>
                <p className="text-gray-400 text-sm">Account preferences</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;