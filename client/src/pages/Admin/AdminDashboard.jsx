import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSignOutAlt,
  FaBox,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/admin/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-text-secondary">Manage your product catalog</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/products/new">
              <button className="flex items-center px-6 py-2 bg-secondary-orange hover:bg-secondary-lightOrange text-white rounded-full font-semibold transition-colors">
                <FaPlus className="mr-2" />
                Add Product
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-2 glassmorphism hover:bg-red-500/20 text-text-primary rounded-full font-semibold transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { icon: FaBox, label: "Total Products", value: products.length },
            {
              icon: FaTags,
              label: "Categories",
              value: [...new Set(products.map((p) => p.category))].length,
            },
            {
              icon: FaUsers,
              label: "Brands",
              value: [...new Set(products.map((p) => p.brand))].length,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism-dark p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                  <p className="text-3xl font-heading font-bold">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="text-4xl text-secondary-orange/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Table */}
        <div className="glassmorphism-dark rounded-3xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-heading font-bold">Products</h2>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-dark-slate border border-white/10 rounded-full text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-secondary-orange border-t-accent-cyan rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left text-text-secondary text-sm">
                    <th className="pb-3">Product</th>
                    <th className="pb-3 hidden md:table-cell">Category</th>
                    <th className="pb-3 hidden lg:table-cell">Brand</th>
                    <th className="pb-3 hidden md:table-cell">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-text-secondary"
                      >
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-text-secondary md:hidden">
                                {product.category} • {product.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 hidden md:table-cell">
                          {product.category}
                        </td>
                        <td className="py-3 hidden lg:table-cell">
                          {product.brand}
                        </td>
                        <td className="py-3 hidden md:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.stockStatus === "In Stock"
                                ? "bg-green-500/20 text-green-500"
                                : product.stockStatus === "On Order"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {product.stockStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="p-2 hover:bg-accent-cyan/10 rounded-full transition-colors"
                            >
                              <FaEdit className="text-accent-cyan" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
