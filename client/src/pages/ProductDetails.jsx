import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaArrowLeft,
  FaShare,
  FaPrint,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import api from "../services/api";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specifications");
  const [showImageModal, setShowImageModal] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);

      const relatedResponse = await api.get("/products", {
        params: {
          category: response.data.category,
          limit: 4,
        },
      });
      setRelatedProducts(relatedResponse.data.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (Product ID: ${product._id})`;
    window.open(
      `https://wa.me/${product.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleImageZoom = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-secondary-orange border-t-accent-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-24 text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">
          Product Not Found
        </h2>
        <Link to="/products" className="text-secondary-orange hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} – MORS ENGINEERS India`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-text-secondary mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-secondary-orange transition-colors"
            >
              Home
            </Link>
            <span>›</span>
            <Link
              to="/products"
              className="hover:text-secondary-orange transition-colors"
            >
              Products
            </Link>
            <span>›</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery - Left Column */}
            <div>
              <div className="relative bg-dark-slate rounded-3xl overflow-hidden group">
                <div
                  ref={imageRef}
                  className="relative overflow-hidden cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleImageZoom}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300"
                    style={{
                      transform: isZoomed ? "scale(2)" : "scale(1)",
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }}
                  />
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="p-3 glassmorphism-dark rounded-full hover:border-secondary-orange transition-colors"
                    aria-label="Zoom image"
                  >
                    <FaExpand className="text-xl" />
                  </button>
                </div>

                {product.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-secondary-orange text-sm font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-4">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="thumbs-gallery"
                  >
                    {[product.image, ...product.gallery].map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-secondary-orange transition-colors">
                          <img
                            src={img}
                            alt={`Product view ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            {/* Product Info - Right Column */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                    <span className="px-3 py-1 bg-dark-slate rounded-full">
                      Brand: {product.brand}
                    </span>
                    <span className="px-3 py-1 bg-dark-slate rounded-full">
                      Category: {product.category}
                    </span>
                    {product.subcategory && (
                      <span className="px-3 py-1 bg-dark-slate rounded-full">
                        Sub: {product.subcategory}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator
                        .share({
                          title: product.name,
                          text: product.description,
                          url: window.location.href,
                        })
                        .catch(() =>
                          navigator.clipboard.writeText(window.location.href),
                        );
                      toast.success("Link copied to clipboard!");
                    }}
                    className="p-2 glassmorphism rounded-full hover:border-secondary-orange transition-colors"
                    aria-label="Share product"
                  >
                    <FaShare />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 glassmorphism rounded-full hover:border-secondary-orange transition-colors"
                    aria-label="Print product details"
                  >
                    <FaPrint />
                  </button>
                </div>
              </div>

              {/* Rating & Stock Status */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < 4 ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                  <span className="text-sm text-text-secondary ml-2">
                    (24 reviews)
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.stockStatus === "In Stock"
                      ? "bg-green-500/20 text-green-500"
                      : product.stockStatus === "On Order"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {product.stockStatus}
                </span>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FaCheckCircle className="text-green-500" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FaTruck className="text-accent-cyan" />
                  <span>PAN India Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FaShieldAlt className="text-secondary-orange" />
                  <span>Genuine Products</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FaWhatsapp className="text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Tabs */}
              <div className="border-b border-white/10 mb-6">
                <div className="flex flex-wrap gap-6">
                  {["specifications", "applications", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-medium transition-colors relative capitalize ${
                        activeTab === tab
                          ? "text-secondary-orange"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-orange"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                {activeTab === "specifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert max-w-none"
                  >
                    {product.specifications ? (
                      <div className="bg-dark-slate/50 rounded-xl p-4">
                        <pre className="whitespace-pre-wrap font-body text-text-secondary text-sm">
                          {product.specifications}
                        </pre>
                      </div>
                    ) : (
                      <p className="text-text-secondary">
                        No specifications available.
                      </p>
                    )}
                  </motion.div>
                )}
                {activeTab === "applications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert max-w-none"
                  >
                    {product.applications ? (
                      <div className="bg-dark-slate/50 rounded-xl p-4">
                        <pre className="whitespace-pre-wrap font-body text-text-secondary text-sm">
                          {product.applications}
                        </pre>
                      </div>
                    ) : (
                      <p className="text-text-secondary">
                        No applications listed.
                      </p>
                    )}
                  </motion.div>
                )}
                {activeTab === "reviews" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-center py-8">
                      <p className="text-text-secondary">
                        No reviews yet. Be the first to review!
                      </p>
                      <button className="mt-4 text-secondary-orange hover:underline">
                        Write a Review
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="flex-1">
                  <Button
                    variant="primary"
                    size="large"
                    className="w-full group"
                  >
                    <span>Request Quote</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
                <button onClick={handleWhatsApp} className="flex-1">
                  <Button variant="whatsapp" size="large" className="w-full">
                    <FaWhatsapp className="mr-2" />
                    Negotiate on WhatsApp
                  </Button>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-text-secondary">
                <span>✓ 100% Genuine Products</span>
                <span>✓ PAN India Delivery</span>
                <span>✓ Technical Support</span>
                <span>✓ GST Invoice</span>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-heading font-bold mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related._id} to={`/products/${related._id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="glassmorphism rounded-2xl p-4 transition-all duration-300 hover:border-secondary-orange/30"
                    >
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-48 object-contain mb-4 rounded-lg bg-dark-slate/50"
                        loading="lazy"
                      />
                      <h3 className="font-semibold line-clamp-2 mb-1">
                        {related.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {related.brand}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 p-3 glassmorphism-dark rounded-full hover:border-secondary-orange transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-2xl" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetails;
