// controller.js

const Products = require("../models/Products");

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      brand,
      category,
      saleprice,
      totalstock,
      price,
    } = req.body;

    const newProduct = new Products({
      image,
      title,
      description,
      brand,
      category,
      saleprice,
      totalstock,
      price,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Products.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.status(200).json({ success: true, message: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.status(200).json({ success: true, data: allProducts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addProduct, deleteProduct, getAllProducts, updateProduct };
