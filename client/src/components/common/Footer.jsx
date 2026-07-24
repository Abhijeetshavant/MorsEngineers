import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-slate text-text-primary pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
              MORS ENGINEERS
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Your Trusted MRO & Engineering Goods Supply Partner Across India.
              Delivering industrial excellence since 2019.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-text-secondary hover:text-secondary-orange transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-secondary-orange transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-secondary-orange transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-secondary-orange transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Products", "Services", "About Us", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      className="text-text-secondary hover:text-secondary-orange transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Categories</h4>
            <ul className="space-y-3">
              {[
                "Electrical",
                "Automation",
                "Sensors",
                "Bearings",
                "Safety Equipment",
                "MRO Items",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="text-text-secondary hover:text-secondary-orange transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary-orange mt-1 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  Mcf 902 Gali No 57 Sanjay Colony sec 23, Faridabad,
                  Haryana,121005 India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-secondary-orange flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  +91 9773774716
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaWhatsapp className="text-green-500 flex-shrink-0" />
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-green-500 transition-colors text-sm"
                >
                  WhatsApp Now
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary-orange flex-shrink-0" />
                <a
                  href="mailto:info@morsengineers.com"
                  className="text-text-secondary hover:text-secondary-orange transition-colors text-sm"
                >
                  mors.engineers@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-text-secondary text-sm">
            © 2019 MORS ENGINEERS. All rights reserved.
          </p>
          <div className="flex space-x-6 text-text-secondary text-sm">
            <a
              href="#"
              className="hover:text-secondary-orange transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-secondary-orange transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-secondary-orange transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Created By StarkAiTechnology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-text-secondary text-xs md:text-sm flex items-center justify-center flex-wrap gap-1">
            <span>Created with</span>
            <FaHeart className="text-red-500 animate-pulse mx-1" />
            <span>by</span>
            <a
              href="https://starAiTechnology"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-text font-semibold hover:opacity-80 transition-opacity"
            >
              StarkAiTechnology
            </a>
            <span className="hidden sm:inline">|</span>
            <span className="text-text-secondary/60 text-xs">v2.0.0</span>
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-text-secondary/40">
            <span>⚡</span>
            <span>Built with React, Tailwind CSS & Framer Motion</span>
            <span>⚡</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
