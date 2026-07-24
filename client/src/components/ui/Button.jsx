import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-secondary-orange hover:bg-secondary-lightOrange text-white",
    secondary: "glassmorphism hover:bg-white/20 text-text-primary",
    outline:
      "border-2 border-secondary-orange text-secondary-orange hover:bg-secondary-orange hover:text-white",
    whatsapp: "bg-green-500 hover:bg-green-600 text-white",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
