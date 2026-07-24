import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaGlobe,
  FaUserTie,
  FaCheckCircle,
  FaSpinner,
  FaPaperPlane,
  FaShare,
} from "react-icons/fa";
import api from "../services/api";
import Button from "../components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  company: z.string().optional(),
  requirement: z.enum([
    "General Inquiry",
    "Product Quote",
    "Bulk Order",
    "Technical Support",
    "Other",
  ]),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      requirement: "General Inquiry",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await api.post("/inquiries", data);
      setFormData(data);
      setIsSuccess(true);
      setShowShareOptions(true);
      toast.success(
        "Message sent successfully! We'll get back to you shortly.",
      );
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setShowShareOptions(false);
    setFormData(null);
  };

  // Generate WhatsApp message
  const getWhatsAppMessage = () => {
    if (!formData) return "";
    return `Hello MORS ENGINEERS Team,

I have submitted a contact form with the following details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || "N/A"}
Requirement: ${formData.requirement}
Subject: ${formData.subject}

Message:
${formData.message}

Please get back to me at the earliest. Thank you!`;
  };

  // Generate Email body
  const getEmailBody = () => {
    if (!formData) return "";
    return `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || "N/A"}
Requirement: ${formData.requirement}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from MORS ENGINEERS Contact Form
    `.trim();
  };

  const requirement = watch("requirement");

  return (
    <>
      <Helmet>
        <title>Contact MORS ENGINEERS – Industrial Supply Partners</title>
        <meta
          name="description"
          content="Get in touch with MORS ENGINEERS for industrial supplies, MRO products, and engineering solutions across India."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Have questions about our products or services? Reach out to our
              team and we'll get back to you within an hours.
            </p>
          </motion.div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: FaWhatsapp,
                label: "WhatsApp",
                value: "Chat Now",
                color: "text-green-500",
                href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`,
              },
              {
                icon: FaPhone,
                label: "Call Us",
                value: "+91 9773774716",
                color: "text-secondary-orange",
                href: "tel:+919773774716",
              },
              {
                icon: FaEnvelope,
                label: "Email",
                value: "mors.engineers@gmail.com",
                color: "text-accent-cyan",
                href: "mailto:mors.engineers@gmail.com",
              },
              {
                icon: FaClock,
                label: "Hours",
                value: "9AM - 9PM (IST)",
                color: "text-text-secondary",
                href: "#",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism-dark p-4 rounded-2xl text-center hover:border-secondary-orange/30 transition-all group"
              >
                <item.icon
                  className={`text-3xl mx-auto mb-2 ${item.color} group-hover:scale-110 transition-transform`}
                />
                <p className="text-xs text-text-secondary">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism-dark p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-heading font-bold mb-6">
                Send Us a Message
              </h2>

              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6"
                >
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    We'll get back to you within 24 hours.
                  </p>

                  {/* Share Options */}
                  <AnimatePresence>
                    {showShareOptions && formData && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <p className="text-sm text-text-secondary">
                          📤 Share your inquiry directly:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          {/* WhatsApp Option */}
                          <a
                            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                              getWhatsAppMessage(),
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
                          >
                            <FaWhatsapp className="text-xl" />
                            Send via WhatsApp
                          </a>

                          {/* Email Option */}
                          <a
                            href={`mailto:mors.engineers@gmail.com?subject=${encodeURIComponent(
                              `Inquiry: ${formData.subject}`,
                            )}&body=${encodeURIComponent(getEmailBody())}`}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan/20 hover:bg-accent-cyan/30 text-accent-cyan rounded-full font-semibold transition-colors border border-accent-cyan/30"
                          >
                            <FaEnvelope className="text-xl" />
                            Send via Email
                          </a>
                        </div>

                        <button
                          onClick={handleReset}
                          className="mt-4 text-sm text-text-secondary hover:text-secondary-orange transition-colors"
                        >
                          Send another message →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Requirement Type *
                    </label>
                    <select
                      {...register("requirement")}
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Quote">Product Quote</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <input
                      {...register("subject")}
                      type="text"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                      placeholder="Product Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows="4"
                      className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-text-secondary/60 text-center mt-2">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="glassmorphism-dark p-8 rounded-3xl">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <FaUserTie className="text-secondary-orange" />
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <FaMapMarkerAlt className="text-secondary-orange text-xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-semibold">Office Address</h4>
                      <p className="text-text-secondary text-sm">
                        Mcf 902 Gali No.57 Sanjay colony sec 23,
                        <br />
                        Faridabad, Haryana
                        <br />
                        India - 121005
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <FaBuilding className="text-accent-cyan text-xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-semibold">Warehouse Location</h4>
                      <p className="text-text-secondary text-sm">
                        Industrial Area,
                        <br />
                        Faridabad, Haryana
                        <br />
                        India - 121003
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <FaGlobe className="text-secondary-orange text-xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-semibold">Service Area</h4>
                      <p className="text-text-secondary text-sm">
                        PAN India Supply Network
                        <br />
                        Serving all major cities
                        <br />
                        and industrial hubs
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <FaPhone className="text-secondary-orange" />
                      <a
                        href="tel:+919773774716"
                        className="text-text-secondary hover:text-secondary-orange transition-colors"
                      >
                        +91 9773774716
                      </a>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <FaWhatsapp className="text-green-500" />
                      <a
                        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-green-500 transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-accent-cyan" />
                      <a
                        href="mailto:mors.engineers@gmail.com"
                        className="text-text-secondary hover:text-accent-cyan transition-colors"
                      >
                        mors.engineers@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glassmorphism-dark p-4 rounded-3xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.8306939053967!2d77.31934171508088!3d28.39584298250994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb659b3c6d15%3A0x4b8e1c3f9d8a7e4b!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MORS ENGINEERS Location - Faridabad, Haryana"
                />
              </div>

              {/* Quick Directions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glassmorphism-dark p-4 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    📍 Get directions to our office
                  </span>
                  <a
                    href="https://www.google.com/maps/dir//Mcf+902+Gali+No.57+Sanjay+colony+sec+23+Faridabad+Haryana+121005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-secondary-orange/20 hover:bg-secondary-orange/30 text-secondary-orange rounded-full text-sm font-semibold transition-colors"
                  >
                    Open in Maps
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
