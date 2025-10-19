import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Building2, User2, Menu, X, Shield, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SegmentButton = ({ label, accent = "emerald", children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all
          border-${accent}-500 text-${accent}-600 hover:bg-${accent}-50 hover:shadow-sm`}
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur border border-gray-100 rounded-xl shadow-xl p-2 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const NavbarAlt = () => {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const nav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/rooms", label: "Rooms" },
    { to: "/facilities", label: "Facilities" },
    { to: "/restaurant", label: "Restaurant" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3"></div>
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl border border-white/40">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
                LuxeStay
              </span>
            </Link>

            {/* Center: Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1 border border-gray-200">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white transition-all"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Session/Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Admin
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl border-2 border-red-500 text-red-600 text-sm font-medium hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 inline -mt-0.5 mr-1" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <SegmentButton label={<span className="flex items-center gap-2"><User2 className="w-4 h-4" /> Guest</span>} accent="emerald">
                    <Link to="/login" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Guest Sign In</Link>
                    <Link to="/signup" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Guest Sign Up</Link>
                  </SegmentButton>
                  <SegmentButton label={<span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Hotel</span>} accent="cyan">
                    <Link to="/hotel/login" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Hotel Sign In</Link>
                    <Link to="/hotel/signup" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Register Hotel</Link>
                  </SegmentButton>
                </div>
              )}
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile panel */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl bg-gray-50 text-gray-800 text-sm font-medium hover:bg-white border border-gray-200"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>

              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-emerald-200 p-2">
                    <div className="text-xs uppercase text-emerald-600 font-semibold px-2">Guest</div>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Guest Sign In</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Guest Sign Up</Link>
                  </div>
                  <div className="rounded-xl border border-cyan-200 p-2">
                    <div className="text-xs uppercase text-cyan-600 font-semibold px-2">Hotel</div>
                    <Link to="/hotel/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Hotel Sign In</Link>
                    <Link to="/hotel/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">Register Hotel</Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl bg-gray-50 text-gray-800 text-sm font-medium hover:bg-white border border-gray-200">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full px-4 py-3 rounded-xl border-2 border-red-500 text-red-600 text-sm font-medium hover:bg-red-50">Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAlt;
