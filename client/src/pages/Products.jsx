import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp, FaSearch, FaFilter } from "react-icons/fa";
import api from "../services/api";
import { categories } from "../utils/constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedBrand]);

  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedBrand) params.brand = selectedBrand;
    setSearchParams(params);
  }, [searchTerm, selectedCategory, selectedBrand]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        params: {
          search: searchTerm || undefined,
          category: selectedCategory || undefined,
          brand: selectedBrand || undefined,
        },
      });
      setProducts(response.data);

      // Extract unique brands
      const uniqueBrands = [...new Set(response.data.map((p) => p.brand))];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <Helmet>
        <title>Industrial Products – MORS ENGINEERS India</title>
        <meta
          name="description"
          content="Browse our comprehensive catalog of industrial products including electrical, automation, sensors, bearings, safety equipment, and engineering spares."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-navy to-transparent z-10" />
            <img
              src="https://via.placeholder.com/1920x400/1a233a/ffffff?text=Our+Product+Catalog"
              alt="Products Banner"
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center px-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                  Our Product Catalog
                </h1>
                <p className="text-text-secondary text-sm md:text-base">
                  Explore our wide range of industrial products and engineering
                  supplies
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-dark-slate border border-white/10 rounded-full text-text-primary placeholder-text-secondary focus:outline-none focus:border-secondary-orange transition-colors"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center md:w-auto"
              >
                <FaFilter className="mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 glassmorphism-dark p-6 rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-4 py-2 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      setSelectedBrand("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-secondary-orange border-t-accent-cyan rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No products found</p>
              <p className="text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={cardVariants}>
                  <Card className="h-full flex flex-col">
                    <Link to={`/products/${product._id}`} className="flex-1">
                      <div className="relative aspect-square mb-4 bg-dark-slate rounded-xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                        {product.featured && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-secondary-orange text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-text-secondary">
                          {product.brand}
                        </span>
                        <span className="text-xs text-text-secondary">•</span>
                        <span className="text-xs text-text-secondary">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex gap-2 mt-4">
                      <Link to={`/products/${product._id}`} className="flex-1">
                        <Button
                          variant="primary"
                          size="small"
                          className="w-full text-sm"
                        >
                          Request Best Price
                        </Button>
                      </Link>
                      <a
                        href={`https://wa.me/${product.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER}?text=I'm interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="whatsapp"
                          size="small"
                          className="px-3"
                        >
                          <FaWhatsapp />
                        </Button>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
