import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // ← ADD THIS IMPORT
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaEye,
  FaHeart,
  FaRocket,
  FaUsers,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaChartLine,
  FaGlobe,
  FaHandshake,
} from "react-icons/fa";
import SectionHeader from "../components/ui/SectionHeader";

const AboutUs = () => {
  const [activeYear, setActiveYear] = useState(0);

  const timelineEvents = [
    {
      year: "2019",
      event: "Founded in Faridabad, Haryana",
      description: "Started operations as a small industrial supply store",
    },
    {
      year: "2020",
      event: "Expanded PAN India supply network",
      description: "Established partnerships with 50+ industrial brands",
    },
    {
      year: "2021",
      event: "Launched automation solutions division",
      description: "Introduced industrial automation and control systems",
    },
    {
      year: "2022",
      event: "Added on-site installation services",
      description: "Started providing installation and commissioning support",
    },
    {
      year: "2023",
      event: "Reached 500+ business clients",
      description: "Expanded client base across diverse industries",
    },
    {
      year: "2024",
      event: "Launched digital marketplace platform",
      description: "Moved to digital-first procurement model",
    },
  ];

  const values = [
    {
      icon: FaTrophy,
      title: "Excellence",
      description: "We strive for excellence in everything we do",
    },
    {
      icon: FaHeart,
      title: "Integrity",
      description: "We operate with honesty and transparency",
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description: "We embrace innovation and continuous improvement",
    },
    {
      icon: FaUsers,
      title: "Customer First",
      description: "Our customers are at the heart of our business",
    },
  ];

  const stats = [
    { icon: FaBuilding, value: "500+", label: "Clients Served" },
    { icon: FaGlobe, value: "28", label: "States Covered" },
    { icon: FaChartLine, value: "100+", label: "Industrial Brands" },
    { icon: FaHandshake, value: "95%", label: "Client Retention" },
  ];

  return (
    <>
      <Helmet>
        <title>About MORS ENGINEERS – Industrial Supply Partner</title>
        <meta
          name="description"
          content="Learn about MORS ENGINEERS, your trusted MRO and engineering goods supplier in Faridabad, Haryana. Serving PAN India since 2019."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              About <span className="gradient-text">MORS ENGINEERS</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Building industrial excellence since 2019 with quality,
              reliability, and technical expertise.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="glassmorphism-dark p-6 rounded-2xl text-center"
              >
                <stat.icon className="text-3xl text-secondary-orange mx-auto mb-3" />
                <p className="text-2xl font-heading font-bold">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glassmorphism-dark rounded-3xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-secondary-orange" />
                  Our Story
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Founded in 2019 in Faridabad, Haryana, MORS ENGINEERS has
                  grown to become a premier supplier of MRO, engineering goods,
                  and industrial automation products across India.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  We specialize in providing comprehensive industrial solutions,
                  from sourcing the right components to on-site installation
                  support. Our commitment to quality, reliability, and customer
                  satisfaction has made us a trusted partner for businesses
                  ranging from startups to large enterprises.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-64 lg:h-auto bg-gradient-to-br from-secondary-orange/20 to-accent-cyan/20">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-6xl mb-4">🏭</p>
                    <p className="text-2xl font-heading font-bold gradient-text">
                      MORS ENGINEERS
                    </p>
                    <p className="text-text-secondary">Since 2019</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Vision Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: FaTrophy,
                title: "Our Mission",
                description:
                  "To provide world-class industrial products and services that drive efficiency and innovation in Indian industries.",
                color: "text-secondary-orange",
              },
              {
                icon: FaEye,
                title: "Our Vision",
                description:
                  "To be the most trusted industrial marketplace in India, known for quality, reliability, and technical excellence.",
                color: "text-accent-cyan",
              },
              {
                icon: FaHeart,
                title: "Our Values",
                description:
                  "Integrity, Innovation, Excellence, and Customer First – these principles guide everything we do.",
                color: "text-text-primary",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism p-8 rounded-2xl text-center group hover:border-secondary-orange/30 transition-all"
              >
                <item.icon
                  className={`text-4xl ${item.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-heading font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <SectionHeader
              title="Core Values"
              subtitle="The principles that drive us"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="glassmorphism-dark p-6 rounded-2xl text-center"
                >
                  <value.icon className="text-3xl text-secondary-orange mx-auto mb-3" />
                  <h4 className="font-heading font-bold mb-2">{value.title}</h4>
                  <p className="text-sm text-text-secondary">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SectionHeader
              title="Our Journey"
              subtitle="Building excellence since 2019"
            />
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-secondary-orange to-accent-cyan hidden md:block" />

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex flex-col md:flex-row items-center mb-8 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
                  >
                    <div
                      className={`glassmorphism-dark p-6 rounded-2xl cursor-pointer transition-all hover:border-secondary-orange/30 ${
                        activeYear === index ? "border-secondary-orange" : ""
                      }`}
                      onClick={() =>
                        setActiveYear(activeYear === index ? -1 : index)
                      }
                    >
                      <h4 className="text-xl font-heading font-bold text-secondary-orange">
                        {event.year}
                      </h4>
                      <h5 className="font-semibold mb-2">{event.event}</h5>
                      {activeYear === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-text-secondary text-sm mt-2"
                        >
                          {event.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center md:block hidden">
                    <div className="w-4 h-4 rounded-full bg-secondary-orange border-4 border-dark" />
                  </div>
                  <div className="w-full md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="glassmorphism-dark rounded-3xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-4">
                Ready to Partner with Us?
              </h2>
              <p className="text-text-secondary mb-6">
                Join 500+ businesses that trust MORS ENGINEERS for their
                industrial needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <button className="px-8 py-3 bg-secondary-orange hover:bg-secondary-lightOrange text-white rounded-full font-semibold transition-colors">
                    Get Started
                  </button>
                </Link>
                <Link to="/products">
                  <button className="px-8 py-3 glassmorphism hover:bg-white/10 text-text-primary rounded-full font-semibold transition-colors">
                    Explore Products
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
