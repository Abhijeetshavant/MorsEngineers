import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import api from "../../services/api";
import { categories } from "../../utils/constants";
import Button from "../../components/ui/Button";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  brand: z.string().min(2, "Brand is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  specifications: z.string().optional(),
  applications: z.string().optional(),
  featured: z.boolean().default(false),
  stockStatus: z.enum(["In Stock", "On Order", "Out of Stock"]),
  whatsappNumber: z.string().optional(),
});

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      featured: false,
      stockStatus: "In Stock",
    },
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      setExistingImage(product.image);
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("subcategory", product.subcategory || "");
      setValue("brand", product.brand);
      setValue("description", product.description);
      setValue("specifications", product.specifications || "");
      setValue("applications", product.applications || "");
      setValue("featured", product.featured);
      setValue("stockStatus", product.stockStatus);
      setValue("whatsappNumber", product.whatsappNumber || "");
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Create FormData
      const formData = new FormData();

      // Append all fields
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      // Append image if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Log form data for debugging
      console.log("Submitting form data:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      let response;
      const url = id ? `/products/admin/${id}` : "/products/admin";

      const method = id ? "put" : "post";

      response = await api[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Product saved successfully!");
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);

      // Show detailed error
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Failed to save product");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Error saving product: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism-dark p-8 rounded-3xl"
        >
          <h1 className="text-3xl font-heading font-bold mb-6">
            {id ? "Edit Product" : "Add New Product"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="e.g., Industrial Bearing SKF 6204"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand *
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="e.g., SKF, Siemens, Bosch"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subcategory
                </label>
                <input
                  {...register("subcategory")}
                  type="text"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="e.g., Ball Bearings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Stock Status
                </label>
                <select
                  {...register("stockStatus")}
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="On Order">On Order</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  WhatsApp Number
                </label>
                <input
                  {...register("whatsappNumber")}
                  type="text"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="+919999999999"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  {...register("description")}
                  rows="3"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="Describe your product in detail..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Specifications
                </label>
                <textarea
                  {...register("specifications")}
                  rows="3"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="Technical specifications of the product"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Applications
                </label>
                <textarea
                  {...register("applications")}
                  rows="3"
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
                  placeholder="Where and how the product is used"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Product Image *
                </label>
                {(imagePreview || existingImage) && (
                  <div className="mb-4">
                    <img
                      src={imagePreview || existingImage}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary-orange file:text-white hover:file:bg-secondary-lightOrange"
                />
                {!id && !imagePreview && (
                  <p className="text-xs text-text-secondary mt-1">
                    Please select an image (JPG, PNG, GIF, WebP)
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3">
                  <input
                    {...register("featured")}
                    type="checkbox"
                    className="w-4 h-4 text-secondary-orange rounded border-white/10 focus:ring-secondary-orange"
                  />
                  <span className="text-sm font-medium">Featured Product</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : id
                    ? "Update Product"
                    : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductForm;
