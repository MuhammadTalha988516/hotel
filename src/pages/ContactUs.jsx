import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Sparkles, Star, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      // Form and info animation
      gsap.from([formRef.current, infoRef.current], {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-6  bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80')`
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-float">
          <MessageCircle className="text-emerald-400" size={20} />
        </div>
        <div className="absolute top-1/3 right-24 w-16 h-16 bg-cyan-400/20 rounded-3xl flex items-center justify-center backdrop-blur-sm animate-float animation-delay-2000">
          <Star className="text-cyan-400" fill="currentColor" size={24} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-md border border-white/20">
            <MessageCircle className="w-4 h-4" />
            <span>Get In Touch • 24/7 Support</span>
          </div>
          
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            Let's Connect
          </h1>
          <p className="text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Ready to experience luxury like never before? We're here to make your dream stay a reality.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="relative py-32 px-4">
        <div className="max-w-6xl  mt-8 mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <div ref={infoRef} className="space-y-12">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-emerald-500/30 text-emerald-300 font-medium backdrop-blur-md text-sm mb-6">
                  <Sparkles className="w-4 h-4" /> Contact Information
                </span>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 mb-6">
                  Ready to Connect?
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Our dedicated team is available 24/7 to assist with reservations, inquiries, and creating unforgettable experiences.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "123 Paradise Boulevard\nDream City, DC 12345\nUnited States",
                    gradient: "from-emerald-500 to-cyan-600"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+1 (555) 123-4567\n+1 (555) 987-6543",
                    gradient: "from-cyan-500 to-violet-600"
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@luxestay.com\nreservations@luxestay.com",
                    gradient: "from-violet-500 to-purple-600"
                  },
                  {
                    icon: Clock,
                    title: "Availability",
                    content: "24/7 Concierge Service\nRestaurant: 6:00 AM - 11:00 PM",
                    gradient: "from-purple-500 to-pink-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="group flex items-start space-x-6 p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-700/50 backdrop-blur-xl rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(0,255,200,0.1)] transition-all duration-500 hover:-translate-y-1">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-10">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Phone size={20} />
                  <span>Call Now</span>
                </button>
                <button className="flex-1 bg-slate-800/50 border border-slate-700 text-white px-6 py-4 rounded-xl font-medium hover:bg-slate-700/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <Mail size={20} />
                  <span>Email Us</span>
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef} className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Glow corners */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 mb-4 flex items-center justify-center">
                    <Send className="mr-3 text-emerald-400" size={28} />
                    Send us a Message
                  </h3>
                  <p className="text-slate-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-slate-400 mb-2 tracking-wide">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder-slate-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-slate-400 mb-2 tracking-wide">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder-slate-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-slate-400 mb-2 tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder-slate-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-slate-400 mb-2 tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder-slate-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm text-slate-400 mb-2 tracking-wide">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="reservations">Room Reservations</option>
                      <option value="events">Events & Weddings</option>
                      <option value="dining">Dining Reservations</option>
                      <option value="spa">Spa Services</option>
                      <option value="feedback">Feedback & Reviews</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-400 mb-2 tracking-wide">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder-slate-500 resize-none"
                      placeholder="Tell us about your inquiry or how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_25px_rgba(0,255,200,0.25)] hover:shadow-[0_0_35px_rgba(0,255,200,0.35)] transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 relative z-10 animate-spin" />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">Send Message</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;