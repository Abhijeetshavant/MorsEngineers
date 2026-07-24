import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold">{title}</h2>
      {subtitle && (
        <p className="text-text-secondary max-w-2xl mx-auto mt-4">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
