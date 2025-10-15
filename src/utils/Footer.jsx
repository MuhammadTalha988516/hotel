import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

const Footer = () => {
  const socials = [
    { icon: Facebook, url: "#" },
    { icon: Twitter, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Youtube, url: "#" },
  ];

  const links = [
    { label: "Home", path: "/" },
    { label: "Rooms", path: "/rooms" },
    { label: "Dining", path: "/dining" },
    { label: "Spa & Wellness", path: "/spa" },
    { label: "Contact", path: "/contact" },
  ];

  const contact = [
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "hello@luxestay.com" },
    { icon: MapPin, text: "123 Paradise Blvd, Dream City" },
  ];

  return (
    <footer className="bg-slate-950 text-gray-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* === Top Section === */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-3">LuxeStay</h2>
            <p className="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
              Where every stay is a story — timeless elegance, crafted comfort,
              and memories that linger.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  className="p-2 rounded-md bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              {contact.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <item.icon className="text-emerald-400 w-4 h-4 mt-0.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Bottom Bar === */}
        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 LuxeStay. All rights reserved.</p>
          <p className="flex items-center mt-3 md:mt-0">
            Made by LuxeStay
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;