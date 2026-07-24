import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    specifications: {
      type: String,
    },
    applications: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "On Order", "Out of Stock"],
      default: "In Stock",
    },
    whatsappNumber: {
      type: String,
      default: "+919999999999",
    },
  },
  {
    timestamps: true,
  },
);

// Index for search functionality
productSchema.index({ name: "text", description: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;
