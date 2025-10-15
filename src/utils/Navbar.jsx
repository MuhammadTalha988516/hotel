import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Settings, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  /* ----------  FIXED: initialise scroll-state on the client  ---------- */
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 50
  );

  const [showUserMenu, setShowUserMenu] = useState(false);
  const navbarRef = useRef(null);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ---------------  LOGO  --------------- */}
          <a href="/" className="flex items-center group">
            <span
              className={`text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                isScrolled
                  ? "bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent"
                  : "text-white drop-shadow-lg"
              }`}
            >
              LuxeStay
            </span>
          </a>

          {/* ---------------  DESKTOP NAV (centred)  --------------- */}
          <div className="hidden lg:flex items-center justify-center gap-4 space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 group ${
                  isScrolled
                    ? "text-gray-700 hover:text-emerald-600"
                    : "text-white hover:text-emerald-300"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* ---------------  RIGHT SIDE BUTTONS  --------------- */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((s) => !s)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-emerald-400"
                  />
                  <span
                    className={`font-medium ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {user?.name}
                  </span>
                  {isAdmin && <Shield className="w-4 h-4 text-purple-400" />}
                </button>

                {/*  USER DROPDOWN  */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
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
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className={`px-5 py-2.5 border-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                      : "border-white/50 text-white hover:bg-white hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* ---------------  MOBILE MENU BUTTON  --------------- */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ---------------  MOBILE MENU PANEL  --------------- */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? "max-h-[600px] opacity-100 py-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div
            className={`space-y-3 ${
              isScrolled
                ? "bg-white"
                : "bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3.5 rounded-xl font-medium text-center transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 hover:text-emerald-600"
                    : "text-white hover:bg-white/10"
                }`}
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
                      <p
                        className={`font-medium text-sm ${
                          isScrolled ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {user?.name}
                      </p>
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
                    className={`block px-5 py-3.5 rounded-xl font-medium text-center transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`block w-full px-5 py-3.5 rounded-xl font-medium text-center transition-all duration-300 ${
                      isScrolled
                        ? "text-red-600 hover:bg-red-50"
                        : "text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 rounded-xl font-medium text-center transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 border-2 rounded-xl font-medium text-center transition-all duration-300 ${
                      isScrolled
                        ? "border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                        : "border-white/50 text-white hover:bg-white hover:text-gray-900"
                    }`}
                  >
                    Sign Up
                  </Link>
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