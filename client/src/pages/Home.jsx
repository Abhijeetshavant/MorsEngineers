import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/layout/HeroSection";
import TrustSection from "../components/layout/TrustSection";
import CategoryGrid from "../components/layout/CategoryGrid";
import FeatureGrid from "../components/layout/FeatureGrid";
import CTASection from "../components/layout/CTASection";
import { motion } from "framer-motion";
import {
  services,
  industries,
  processSteps,
  testimonials,
} from "../utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          MORS ENGINEERS – Industrial Supplies & MRO Solutions India
        </title>
        <meta
          name="description"
          content="MORS ENGINEERS: Leading MRO and engineering goods supplier in India. Electrical, automation, sensors, bearings, safety equipment, and industrial spares. PAN India delivery."
        />
        <meta
          name="keywords"
          content="industrial supplies India, MRO supplier, engineering goods, automation products, bearings supplier, sensors supplier"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <TrustSection />
        <CategoryGrid />

        {/* Services Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive industrial solutions tailored to your business needs"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index}>
                  <h3 className="text-lg font-heading font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="section-padding bg-dark-slate">
          <div className="container-custom">
            <SectionHeader
              title="Industry Solutions"
              subtitle="Serving diverse industrial sectors with specialized expertise"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 glassmorphism rounded-full text-sm font-medium hover:border-secondary-orange/50 transition-colors"
                >
                  {industry}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <SectionHeader
              title="How We Work"
              subtitle="Simple and transparent procurement process"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="glassmorphism-dark p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary-orange/20 flex items-center justify-center text-secondary-orange font-bold text-xl">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-secondary-orange/50 to-accent-cyan/50 mx-4" />
                      )}
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-dark-slate">
          <div className="container-custom">
            <SectionHeader
              title="What Our Clients Say"
              subtitle="Trusted by leading companies across India"
            />
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <Card className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-orange/20 flex items-center justify-center text-2xl font-bold text-secondary-orange">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-text-secondary">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-text-secondary flex-1">
                        "{testimonial.content}"
                      </p>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < Math.floor(testimonial.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <CTASection />
      </motion.div>
    </>
  );
};

export default Home;
