export const validateProduct = (req, res, next) => {
  const { name, category, brand, description, image } = req.body;

  if (!name || !category || !brand || !description || !image) {
    return res.status(400).json({
      message:
        "Required fields missing: name, category, brand, description, image",
    });
  }

  next();
};
