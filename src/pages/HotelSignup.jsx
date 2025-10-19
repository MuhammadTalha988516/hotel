import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HotelSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: {
      name: '',
      phone: '',
      website: '',
      registrationNumber: '',
      address: { street: '', city: '', state: '', zipCode: '', country: '' },
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { hotelSignup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('company.address.')) {
      const key = name.split('.').slice(2).join('.');
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, address: { ...prev.company.address, [key]: value } },
      }));
    } else if (name.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Contact name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.company.name.trim()) return 'Hotel name is required';
    if (!formData.company.phone.trim()) return 'Hotel contact phone is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      company: {
        name: formData.company.name,
        phone: formData.company.phone || undefined,
        website: formData.company.website || undefined,
        registrationNumber: formData.company.registrationNumber || undefined,
        address: {
          street: formData.company.address.street || undefined,
          city: formData.company.address.city || undefined,
          state: formData.company.address.state || undefined,
          zipCode: formData.company.address.zipCode || undefined,
          country: formData.company.address.country || undefined,
        },
      },
    };
    const result = await hotelSignup(payload);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1551884834-3f5f2b41f0d1?w=800&q=80"
          alt="Hotel Lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Building2 className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Partner with LuxeStay</h2>
            </div>
            <p className="text-lg opacity-90">Create your hotel account</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-2">
              <h1 className="text-3xl font-bold text-gray-900">LuxeStay</h1>
            </Link>
            <p className="text-sm text-gray-500">Hotel Partner Signup</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-2">Create Account</h2>
            <p className="text-gray-600">Join LuxeStay and reach more guests</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
                <input type="text" name="company.name" value={formData.company.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Hotel official name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Phone</label>
                <input type="tel" name="company.phone" value={formData.company.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input type="url" name="company.website" value={formData.company.website} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="https://yourhotel.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input type="text" name="company.registrationNumber" value={formData.company.registrationNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Govt/Tax registration number" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Address</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="company.address.street" value={formData.company.address.street} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Street" />
                <input type="text" name="company.address.city" value={formData.company.address.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="City" />
                <input type="text" name="company.address.state" value={formData.company.address.state} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="State" />
                <input type="text" name="company.address.zipCode" value={formData.company.address.zipCode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="ZIP Code" />
                <input type="text" name="company.address.country" value={formData.company.address.country} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none md:col-span-2" placeholder="Country" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Hotel contact email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Create a password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Confirm your password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>) : (<><span>Create Account</span><ArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already a partner?{' '}
              <Link to="/hotel/login" className="text-emerald-600 hover:text-emerald-500 font-medium">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSignup;
