import React, { useState, useRef } from "react";
import { Menu, X, User, LogOut, Settings, Shield, ChevronDown, Building2, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navbarRef = useRef(null);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // ── always start (and stay) in the "scrolled" visual state ──
  const isScrolled = true;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/rooms", label: "Rooms" },
    { path: "/facilities", label: "Facilities" },
    { path: "/restaurant", label: "Restaurant" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      ref={navbarRef}
      className="fixed w-full z-50 bg-white/95 backdrop-blur-xl shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
              LuxeStay
            </span>
          </Link>

          {/* Desktop Navigation (centred) */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1 border border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((s) => !s)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-emerald-400"
                  />
                  <span className="font-medium text-gray-700">{user?.name}</span>
                  {isAdmin && <Shield className="w-4 h-4 text-purple-400" />}
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 mt-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          <Shield className="w-3 h-3" />
                          Administrator
                        </span>
                      )}
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-200/50 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Sign In dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Sign In <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur border border-gray-100 shadow-xl rounded-xl p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">
                      <User2 className="w-4 h-4 text-emerald-600" /> Guest Sign In
                    </Link>
                    <Link to="/hotel/login" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">
                      <Building2 className="w-4 h-4 text-cyan-600" /> Hotel Sign In
                    </Link>
                  </div>
                </div>

                {/* Create Account dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:shadow-md">
                    Create Account <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-60 bg-white/95 backdrop-blur border border-gray-100 shadow-xl rounded-xl p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <Link to="/signup" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">
                      <User2 className="w-4 h-4 text-emerald-600" /> Guest Sign Up
                    </Link>
                    <Link to="/hotel/signup" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">
                      <Building2 className="w-4 h-4 text-cyan-600" /> Register Hotel
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="lg:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? "max-h-[600px] opacity-100 py-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-3 bg-white rounded-2xl p-4">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3.5 rounded-xl font-medium text-center text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 hover:text-emerald-600 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}

            <div className="border-t border-gray-300/30 my-3 pt-3 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-5 py-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-emerald-400"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">{user?.name}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                          <Shield className="w-3 h-3" />
                          Admin
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-3.5 rounded-xl font-medium text-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full px-5 py-3.5 rounded-xl font-medium text-center text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-wide text-gray-400 px-2">Guest</div>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 rounded-xl font-medium text-center text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Guest Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 border-2 rounded-xl font-medium text-center border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                      Guest Sign Up
                    </Link>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="text-xs uppercase tracking-wide text-gray-400 px-2">Hotel</div>
                    <Link
                      to="/hotel/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 rounded-xl font-medium text-center text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Hotel Sign In
                    </Link>
                    <Link
                      to="/hotel/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 border-2 rounded-xl font-medium text-center border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    >
                      Register Hotel
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;