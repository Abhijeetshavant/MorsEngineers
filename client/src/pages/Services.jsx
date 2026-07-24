import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // ← ADD THIS IMPORT
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTruck,
  FaTools,
  FaRobot,
  FaShieldAlt,
  FaCogs,
  FaHeadset,
  FaClipboardCheck,
  FaRocket,
  FaPlus,
  FaTimes,
  FaCheckDouble,
  FaClock,
  FaUsers,
  FaBuilding,
  FaWhatsapp,
} from "react-icons/fa";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      icon: FaTruck,
      title: "Supply Services",
      description:
        "Comprehensive supply of all industrial goods and equipment with PAN India delivery network.",
      details: [
        "MRO Supplies & Spares",
        "Industrial Equipment Sourcing",
        "Consumables & Tools",
        "Safety Equipment",
        "Electrical & Electronics",
      ],
      color: "text-accent-cyan",
    },
    {
      icon: FaBuilding,
      title: "Industrial Procurement",
      description:
        "End-to-end procurement solutions customized for your industry requirements.",
      details: [
        "Strategic Sourcing",
        "Vendor Management",
        "Cost Optimization",
        "Quality Assurance",
        "Just-in-Time Delivery",
      ],
      color: "text-secondary-orange",
    },
    {
      icon: FaRobot,
      title: "Automation Solutions",
      description:
        "Custom automation solutions to optimize your manufacturing processes.",
      details: [
        "Industrial Automation",
        "PLC Programming",
        "SCADA Systems",
        "Control Panel Design",
        "Process Automation",
      ],
      color: "text-accent-cyan",
    },
    {
      icon: FaTools,
      title: "On-Site Installation",
      description:
        "Professional installation and commissioning services at your facility.",
      details: [
        "Equipment Installation",
        "Commissioning Support",
        "Testing & Calibration",
        "Operator Training",
        "Maintenance Setup",
      ],
      color: "text-secondary-orange",
    },
    {
      icon: FaShieldAlt,
      title: "Maintenance Support",
      description:
        "Preventive and breakdown maintenance services for all industrial equipment.",
      details: [
        "Preventive Maintenance",
        "Breakdown Support",
        "Spare Parts Supply",
        "Condition Monitoring",
        "Repair Services",
      ],
      color: "text-accent-cyan",
    },
    {
      icon: FaCogs,
      title: "Technical Consultation",
      description:
        "Expert engineering guidance and technical support for your projects.",
      details: [
        "Technical Audits",
        "Project Planning",
        "Process Optimization",
        "Equipment Selection",
        "Energy Efficiency",
      ],
      color: "text-secondary-orange",
    },
    {
      icon: FaHeadset,
      title: "24/7 Emergency Support",
      description:
        "Round-the-clock support for critical industrial requirements.",
      details: [
        "Emergency Supply",
        "Breakdown Support",
        "After-Hours Service",
        "Express Delivery",
        "Technical Helpline",
      ],
      color: "text-accent-cyan",
    },
    {
      icon: FaClipboardCheck,
      title: "Quality Assurance",
      description:
        "Rigorous quality control and testing for all products and services.",
      details: [
        "Product Testing",
        "Quality Certification",
        "Supplier Audits",
        "Documentation",
        "Compliance Checking",
      ],
      color: "text-secondary-orange",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <>
      <Helmet>
        <title>Industrial Services – MORS ENGINEERS India</title>
        <meta
          name="description"
          content="Comprehensive industrial services including supply, installation, automation, procurement, and technical support across India."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-dark to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/services/1920/400')] bg-cover bg-center" />
            <div className="relative z-20 px-8 py-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  Our <span className="gradient-text">Services</span>
                </h1>
                <p className="text-text-secondary text-lg">
                  We offer comprehensive industrial solutions to support your
                  business operations and engineering needs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
              >
                <Card
                  hover={false}
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    expandedService === index
                      ? "border-secondary-orange shadow-xl shadow-secondary-orange/10"
                      : ""
                  }`}
                  onClick={() =>
                    setExpandedService(expandedService === index ? null : index)
                  }
                >
                  <div className="flex items-start justify-between mb-4">
                    <service.icon className={`text-4xl ${service.color}`} />
                    {expandedService === index ? (
                      <FaTimes className="text-text-secondary hover:text-secondary-orange transition-colors" />
                    ) : (
                      <FaPlus className="text-text-secondary hover:text-secondary-orange transition-colors" />
                    )}
                  </div>

                  <h3 className="text-xl font-heading font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <AnimatePresence>
                    {expandedService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <ul className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 text-sm text-text-secondary"
                            >
                              <FaCheckDouble className="text-secondary-orange flex-shrink-0" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Industry Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 glassmorphism-dark rounded-3xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">
                  Industry Expertise Across Sectors
                </h2>
                <p className="text-text-secondary mb-6">
                  With deep domain knowledge across multiple industries, we
                  deliver tailored solutions that meet your specific
                  requirements.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Manufacturing",
                    "Automotive",
                    "Pharmaceutical",
                    "Construction",
                    "Infrastructure",
                    "Warehousing",
                    "Power Plants",
                    "Oil & Gas",
                    "Food Processing",
                    "Textile",
                    "Steel",
                    "Chemical",
                  ].map((industry, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-dark-slate rounded-full text-xs font-medium hover:bg-secondary-orange/20 transition-colors cursor-default"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: FaUsers, label: "500+", sub: "Clients Served" },
                  { icon: FaRocket, label: "100+", sub: "Projects Completed" },
                  { icon: FaClock, label: "24/7", sub: "Support Available" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="glassmorphism p-4 rounded-xl text-center"
                  >
                    <stat.icon className="text-2xl text-secondary-orange mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold">
                      {stat.label}
                    </p>
                    <p className="text-xs text-text-secondary">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="glassmorphism-dark rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Need Custom Engineering Support?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto mb-6">
                Our team of experts is ready to provide tailored solutions for
                your specific industrial requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="large">
                    Contact Our Team
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="large">
                    <FaWhatsapp className="mr-2" />
                    WhatsApp Now
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
