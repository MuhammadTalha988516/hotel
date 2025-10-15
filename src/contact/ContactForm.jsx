import React from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-10 shadow-md max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center">
          <Send className="w-6 h-6 mr-2 text-emerald-400" />
          Get in Touch
        </h3>
        <p className="text-slate-400 text-base">
          We'd love to hear from you — fill out the form and our team will get
          back to you shortly.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-7">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-7">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm text-slate-400 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm text-slate-400 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-slate-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm text-slate-400 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+1 (555) 123-4567"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm text-slate-400 mb-2">
            Subject
          </label>
          <select
            id="subject"
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
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

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm text-slate-400 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows="6"
            placeholder="Write your message here..."
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-md transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;