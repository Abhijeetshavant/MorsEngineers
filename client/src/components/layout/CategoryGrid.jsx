import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { categories } from "../../utils/constants";

// Cloudinary image URLs for each category
const categoryImages = {
  "Electrical & Electronics":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/electrical",
  Automation:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/automation",
  "Industrial Sensors":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/sensors",
  Bearings:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/bearings",
  Fasteners:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/fasteners",
  "Engineering Spares":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/spares",
  "Machinery Spares":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/machinery",
  "MRO Items":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/mro",
  "Safety Equipment":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/safety",
  "Pneumatic Tools":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/pneumatic",
  "Power Tools":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/power-tools",
  "Welding Accessories":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/welding",
  "Industrial Consumables":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/consumables",
  Hydraulics:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/hydraulics",
  Valves:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/valves",
  Pumps:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/pumps",
  Motors:
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/motors",
  "Control Panels":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/control-panels",
  "Cables & Wiring":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/cables",
  "CCTV & Security":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/cctv",
  "Testing Instruments":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/testing",
  "Industrial Hardware":
    "https://res.cloudinary.com/demo/image/upload/v1/mors-engineers/categories/hardware",
};

// Fallback images if Cloudinary fails
const fallbackImages = {
  "Electrical & Electronics":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850737/electrical_wwdx3u.png",
  Automation:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850723/automation_nt9gi8.png",
  "Industrial Sensors":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784852825/industrialSensors_cavmf0.png",
  Bearings:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850695/bearings_urfsqx.png",
  Fasteners:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784852909/fastner_f1q92i.png",
  "Engineering Spares":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850912/engineeringspare_icq9ci.png",
  "Machinery Spares":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850889/spareparts_wdecrp.png",
  "MRO Items":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850903/mroitems_g7sfin.png",
  "Safety Equipment":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850872/saftey_zqwk7a.png",
  "Pneumatic Tools":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850861/penumaticstool_dj34au.png",
  "Power Tools":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850853/powertool_ntjdae.png",
  "Welding Accessories":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850845/welding_lr9mni.png",
  "Industrial Consumables":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850835/consumables_k2yyfr.png",
  Hydraulics:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850826/hydrolics_ej47xp.png",
  Valves:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850814/valves_bw9wyr.png",
  Pumps:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850803/pumps_rs5xe0.png",
  Motors:
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850790/moters_sn6pjy.png",
  "Control Panels":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850778/controlpanel_nxazbs.png",
  "Cables & Wiring":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850768/cables_r7zjy1.png",
  "CCTV & Security":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784853234/cctv_u6amjq.png",
  "Testing Instruments":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784850745/testing_smjr2o.png",
  "Industrial Hardware":
    "https://res.cloudinary.com/et9upkgl/image/upload/v1784853606/industriesHardware_rkh5qz.png",
};

const CategoryGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our Product <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our comprehensive range of industrial products and
            engineering supplies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {categories.map((category) => {
            const cloudinaryUrl =
              categoryImages[category.name] ||
              categoryImages["Industrial Hardware"];
            const fallbackUrl =
              fallbackImages[category.name] ||
              fallbackImages["Industrial Hardware"];

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Link to={`/products?category=${category.name}`}>
                  <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={cloudinaryUrl}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback if Cloudinary image fails
                          e.target.src = fallbackUrl;
                        }}
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-end h-full min-h-[200px] p-4 text-center">
                      {/* Category Icon */}
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-xs text-secondary-orange opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Explore</span>
                        <BsArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
