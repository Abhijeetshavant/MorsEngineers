import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-orange/20 via-accent-cyan/10 to-primary-navy" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Need Industrial Supplies Fast?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Talk to Our Engineering Team for Quick Quotes and Expert Advice
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors flex items-center"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              WhatsApp Now
            </motion.a>
            <motion.a
              href="tel:+919999999999"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glassmorphism text-text-primary hover:bg-secondary-orange/20 rounded-full font-semibold transition-colors flex items-center border border-white/20"
            >
              <FaPhone className="mr-2" />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
