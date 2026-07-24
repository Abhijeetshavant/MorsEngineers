import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { search, category, brand, featured } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (featured === "true") {
      query.featured = true;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const {
      name,
      category,
      subcategory,
      brand,
      description,
      specifications,
      applications,
      featured,
      stockStatus,
      whatsappNumber,
    } = req.body;

    // Validate required fields
    if (!name)
      return res.status(400).json({ message: "Product name is required" });
    if (!category)
      return res.status(400).json({ message: "Category is required" });
    if (!brand) return res.status(400).json({ message: "Brand is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });

    let imageUrl = "";
    if (req.file) {
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "mors-engineers/products",
            use_filename: true,
            unique_filename: true,
          },
        );
        imageUrl = result.secure_url;
        console.log("Image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(400)
          .json({ message: "Failed to upload image: " + uploadError.message });
      }
    } else {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create({
      name,
      category,
      subcategory: subcategory || "",
      brand,
      image: imageUrl,
      description,
      specifications: specifications || "",
      applications: applications || "",
      featured: featured === "true" || featured === true,
      stockStatus: stockStatus || "In Stock",
      whatsappNumber: whatsappNumber || "+919999999999",
    });

    console.log("Product created:", product);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      try {
        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "mors-engineers/products",
            use_filename: true,
            unique_filename: true,
          },
        );
        updateData.image = result.secure_url;
        console.log("Image updated:", result.secure_url);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(400)
          .json({ message: "Failed to upload image: " + uploadError.message });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
