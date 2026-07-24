import React from "react";

const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`glassmorphism rounded-2xl p-6 transition-all duration-300 ${
        hover
          ? "hover:scale-105 hover:border-secondary-orange/30 hover:shadow-xl hover:shadow-secondary-orange/10"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
