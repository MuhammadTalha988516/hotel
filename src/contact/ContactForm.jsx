import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    targetAdminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const apiBase = (import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:5001";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = `${form.firstName} ${form.lastName}`.trim();
    if (!name) return setError("Please enter your name");
    if (!form.email) return setError("Please enter a valid email");
    if (!form.subject) return setError("Please select a subject");
    if (!form.message || form.message.length < 10) return setError("Message must be at least 10 characters");

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: form.email,
          phone: form.phone || undefined,
          subject:
            form.subject === "general" ? "General Inquiry" :
            form.subject === "reservations" ? "Room Reservations" :
            form.subject === "events" ? "Events & Weddings" :
            form.subject === "dining" ? "Dining Reservations" :
            form.subject === "spa" ? "Spa Services" :
            form.subject === "feedback" ? "Feedback & Reviews" : form.subject,
          message: form.message,
          targetAdminEmail: form.targetAdminEmail || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Your message has been sent. Please check your email for confirmation.");
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", targetAdminEmail: "" });
      } else {
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Alerts */}
      {success && (
        <div className="mb-6 flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800 rounded-md px-4 py-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-6 flex items-center gap-2 text-red-300 bg-red-950/40 border border-red-800 rounded-md px-4 py-3">
          <XCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Form */}
      <form className="space-y-7" onSubmit={handleSubmit}>
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
              value={form.firstName}
              onChange={handleChange}
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
              value={form.lastName}
              onChange={handleChange}
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
            value={form.email}
            onChange={handleChange}
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
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        {/* Target Admin Email */}
        <div>
          <label htmlFor="targetAdminEmail" className="block text-sm text-slate-400 mb-2">
            Send To (Admin Email)
          </label>
          <input
            type="email"
            id="targetAdminEmail"
            placeholder="admin1@example.com (optional)"
            value={form.targetAdminEmail}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">Leave empty to use default ADMIN1_EMAIL or ADMIN_EMAIL.</p>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm text-slate-400 mb-2">
            Subject
          </label>
          <select
            id="subject"
            value={form.subject}
            onChange={handleChange}
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
            value={form.message}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-5 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-md transition-all flex items-center justify-center gap-2"
        >
          {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>) : (<>Send Message</>)}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;