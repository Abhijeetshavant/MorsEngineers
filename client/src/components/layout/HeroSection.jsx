import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import AnimatedCounter from "../ui/AnimatedCounter";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/industrial-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary-orange/10 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container-custom relative z-20" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-4 py-2 bg-secondary-orange/20 backdrop-blur-sm rounded-full text-secondary-orange text-sm font-semibold border border-secondary-orange/30">
              #1 Industrial Supply Partner in India
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6"
          >
            Engineering Supplies &{" "}
            <span className="gradient-text">Industrial Solutions</span> Across
            India
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 leading-relaxed"
          >
            Electrical, Automation, Sensors, Bearings, Machinery, Welding,
            Safety Equipment & Engineering Spares Delivered Nationwide.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/contact">
              <motion.button
                className="px-8 py-3 bg-secondary-orange hover:bg-secondary-lightOrange text-white rounded-full font-semibold transition-colors flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Quote
                <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Negotiation
              </motion.button>
            </a>
            <Link to="/products">
              <motion.button
                className="px-8 py-3 glassmorphism text-text-primary hover:text-secondary-orange rounded-full font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { value: 1000, label: "Products", suffix: "+" },
              { value: 500, label: "Business Clients", suffix: "+" },
              { value: 100, label: "Industrial Brands", suffix: "+" },
              { value: 24, label: "Technical Support", suffix: "/7" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glassmorphism-dark p-4 rounded-xl text-center"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-secondary-orange">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
