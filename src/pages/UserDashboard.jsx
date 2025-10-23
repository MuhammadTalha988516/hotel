import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Calendar,
  Edit,
  Settings,
  Bell,
  Search,
  Star,
  Plus,
  Camera,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const UserDashboard = () => {
  // All hooks must be called unconditionally at the top level
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State hooks
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Refs
  const mainContentRef = useRef(null);
  const cardsRef = useRef([]);
  const tabsRef = useRef([]);

  // Fetch user bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('luxestay_token');
        if (!token) {
          setError('Please log in to view bookings');
          navigate('/login');
          return;
        }
        
        const response = await ApiService.getUserBookings(token);
        if (response.success) {
          setBookings(response.data || []);
        } else {
          setError(response.message || 'Failed to load bookings');
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('luxestay_token');
            navigate('/login');
          }
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mainContentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      tabsRef.current.forEach((tab, index) => {
        gsap.from(tab, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });

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
  }, [activeTab, bookings]);

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge component
  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: {
        icon: <CheckCircle2 className="w-4 h-4" />,
        color: 'bg-green-100 text-green-800',
        text: 'Confirmed'
      },
      pending: {
        icon: <Clock className="w-4 h-4" />,
        color: 'bg-yellow-100 text-yellow-800',
        text: 'Pending'
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4" />,
        color: 'bg-red-100 text-red-800',
        text: 'Cancelled'
      },
      completed: {
        icon: <CheckCircle2 className="w-4 h-4" />,
        color: 'bg-blue-100 text-blue-800',
        text: 'Completed'
      }
    };

    const statusInfo = statusMap[status.toLowerCase()] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.icon}
        <span className="ml-1">{statusInfo.text}</span>
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading your dashboard...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg max-w-md text-center">
          <AlertCircle className="w-8 h-8 mx-auto text-red-500 mb-2" />
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // User profile data
  const userProfile = {
    name: user?.name || 'Guest User',
    email: user?.email || 'user@example.com',
    memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    totalBookings: bookings.length,
    loyaltyPoints: user?.loyaltyPoints || 0,
    profileImage: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`
  };

  // Use real bookings
  const displayBookings = bookings;

  const loyaltyRewards = user?.rewards || [];

  // Handle booking edit
  const handleEditBooking = (booking) => {
    setCurrentBooking(booking);
    setIsEditModalOpen(true);
  };

  // Handle booking update
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    if (!currentBooking) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('luxestay_token');
      // In a real app, you would make an API call to update the booking
      // const response = await ApiService.updateBooking(currentBooking.id, currentBooking, token);
      
      // For demo, update the local state
      setBookings(bookings.map(booking => 
        booking.id === currentBooking.id ? { ...booking, ...currentBooking } : booking
      ));
      
      // Close modal and show success message
      setIsEditModalOpen(false);
      alert('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle booking deletion
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('luxestay_token');
      if (!token) {
        setError('Please log in to delete bookings');
        navigate('/login');
        return;
      }
      
      // In a real app, you would make an API call to delete the booking
      // const response = await ApiService.deleteBooking(bookingId, token);
      
      // For now, update the local state
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      
      // Show success message
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = localStorage.getItem('luxestay_token');
        // In a real app, you would make an API call to cancel the booking
        // await ApiService.cancelBooking(bookingId, token);
        
        // Update local state
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        ));
        
        // Show success message
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  // Handle input change in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayBookings.map((booking, index) => (
                    <div 
                      key={booking.id || `booking-${index}`}
                      ref={el => cardsRef.current[index] = el}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={booking.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'} 
                          alt={booking.hotel} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{booking.hotel}</h3>
                            <p className="text-gray-600">{booking.room || 'Standard Room'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              ${typeof booking.price === 'number' ? booking.price.toFixed(2) : '0.00'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.checkIn && booking.checkOut 
                                ? `${Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights`
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {booking.checkIn && booking.checkOut && (
                            <>
                              <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Check-in</span>
                                <span className="font-medium">{formatDate(booking.checkIn)}</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600 mb-3">
                                <span>Check-out</span>
                                <span className="font-medium">{formatDate(booking.checkOut)}</span>
                              </div>
                            </>
                          )}
                          
                          {booking.status && (
                            <div className="flex items-center space-x-2 mb-4">
                              {getStatusBadge(booking.status)}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => handleEditBooking(booking)}
                              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                              disabled={booking.status === 'cancelled'}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button 
                              onClick={() => handleCancelBooking(booking.id || index)}
                              className="flex-1 py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                              disabled={booking.status === 'cancelled'}
                            >
                              <XCircle size={14} />
                              <span>{booking.status === 'cancelled' ? 'Cancelled' : 'Cancel'}</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBooking(booking._id || booking.id || index);
                              }}
                              className="flex-1 py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium shadow-sm hover:shadow-md"
                              disabled={isDeleting}
                              title="Delete this booking permanently"
                            >
                              <Trash2 size={14} className="flex-shrink-0" />
                              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {displayBookings.length === 0 && (
                    <div className="col-span-3 text-center py-12">
                      <div className="bg-white p-8 rounded-xl shadow-md inline-block">
                        <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring our rooms!</p>
                        <a 
                          href="/rooms" 
                          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          <Search size={16} className="mr-2" />
                          Find a Room
                        </a>
                      </div>
                    </div>
                  )}
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

      {/* Edit Booking Modal */}
      {isEditModalOpen && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Booking</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUpdateBooking}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                    <input
                      type="text"
                      name="hotel"
                      value={currentBooking.hotel || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Room Type</label>
                    <input
                      type="text"
                      name="room"
                      value={currentBooking.room || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={currentBooking.checkIn?.split('T')[0] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={currentBooking.checkOut?.split('T')[0] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                      min={currentBooking.checkIn?.split('T')[0] || ''}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={currentBooking.specialRequests || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Any special requests or notes for your stay..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
