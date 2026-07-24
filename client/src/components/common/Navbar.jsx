import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import {
  FaWhatsapp,
  FaUserCircle,
  FaSignInAlt,
  FaUserCog,
  FaCog,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
    setShowAccountDropdown(false);
  };

  const handleAdminLogin = () => {
    navigate("/admin/login");
    setShowAccountDropdown(false);
    setIsOpen(false);
  };

  const handleAdminDashboard = () => {
    navigate("/admin/dashboard");
    setShowAccountDropdown(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glassmorphism-dark py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold gradient-text">
            MORS
          </span>
          <span className="text-sm text-text-secondary hidden sm:inline">
            ENGINEERS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors relative group ${
                location.pathname === link.path
                  ? "text-secondary-orange"
                  : "text-text-primary hover:text-secondary-orange"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-orange transition-transform ${
                  location.pathname === link.path
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}

          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className={`flex items-center space-x-2 text-text-primary hover:text-secondary-orange transition-colors ${
                location.pathname === "/admin/login" ||
                location.pathname === "/admin/dashboard"
                  ? "text-secondary-orange"
                  : ""
              }`}
              aria-label="Account menu"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-sm font-medium hidden lg:inline">
                Account
              </span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showAccountDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 glassmorphism-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  {isAuthenticated ? (
                    // Admin is logged in
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-secondary-orange/20 flex items-center justify-center">
                            <FaUserShield className="text-secondary-orange text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              Admin
                            </p>
                            <p className="text-xs text-text-secondary">
                              Administrator
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleAdminDashboard}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center space-x-3"
                      >
                        <FaCog className="text-text-secondary" />
                        <span className="text-sm text-text-primary">
                          Dashboard
                        </span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center space-x-3 border-t border-white/5"
                      >
                        <FaSignInAlt className="text-red-500" />
                        <span className="text-sm text-red-500">Logout</span>
                      </button>
                    </div>
                  ) : (
                    // User is not logged in
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                            <FaUserCircle className="text-accent-cyan text-xl" />
                          </div>
                          {/* <div>
                            <p className="text-sm font-semibold text-text-primary">
                              Guest User
                            </p>
                            <p className="text-xs text-text-secondary">
                              Sign in for admin access
                            </p>
                          </div>  */}
                        </div>
                      </div>
                      <button
                        onClick={handleAdminLogin}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center space-x-3"
                      >
                        <FaSignInAlt className="text-secondary-orange" />
                        <span className="text-sm text-text-primary">
                          Admin Login
                        </span>
                      </button>
                      <div className="px-4 py-2 border-t border-white/5">
                        <p className="text-xs text-text-secondary/60">
                          <span className="text-secondary-orange">🔒</span>{" "}
                          Secure admin access
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
          >
            <FaWhatsapp className="text-lg" />
            <span className="text-sm font-medium hidden lg:inline">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Mobile Account Button */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate("/admin/dashboard");
              } else {
                navigate("/admin/login");
              }
              setIsOpen(false);
            }}
            className="text-2xl text-text-primary hover:text-secondary-orange transition-colors"
            aria-label="Account"
          >
            <FaUserCircle />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-text-primary hover:text-secondary-orange transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism-dark absolute top-full left-0 w-full p-6"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile User Status */}
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-secondary-orange/20 flex items-center justify-center">
                  <FaUserCircle className="text-secondary-orange text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {isAuthenticated ? "Admin" : "Guest User"}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {isAuthenticated
                      ? "Administrator"
                      : "Sign in for admin access"}
                  </p>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-secondary-orange"
                      : "text-text-primary hover:text-secondary-orange"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Admin Links */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleAdminDashboard}
                    className="text-left text-lg font-medium text-text-primary hover:text-secondary-orange transition-colors"
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left text-lg font-medium text-red-500 hover:text-red-400 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAdminLogin}
                  className="text-left text-lg font-medium text-secondary-orange hover:text-secondary-lightOrange transition-colors"
                >
                  🔐 Admin Login
                </button>
              )}

              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full transition-colors mt-2"
              >
                <FaWhatsapp className="text-xl" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
