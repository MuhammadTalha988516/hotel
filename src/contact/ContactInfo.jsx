import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';

const ContactInfo = () => {
  const contactItems = [
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
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
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

      <div className="space-y-6">
        {contactItems.map((item, index) => (
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
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
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
  );
};

export default ContactInfo;