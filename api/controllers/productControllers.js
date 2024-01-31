// controllers/productController.js
import Product from "../models/Product.js";
import fs from "fs";
import { promisify } from 'util';
import { uploadImages } from "../config/cloudinary.js";
const unlinkAsync = promisify(fs.unlink);
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving products" });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving product" });
  }
};

const createProduct = async (req, res) => {
  try {
    // Obtener paths de las imágenes desde multer
    const localPaths = req.files.map((file) => file.path);

    console.log("Paths de imágenes locales:", localPaths);

    // Subir imágenes a Cloudinary
    const cloudinaryData = await uploadImages(localPaths);

    console.log("Respuesta de Cloudinary:", cloudinaryData);
    // Eliminar imágenes locales después de subirlas a Cloudinary
    await Promise.all(localPaths.map(async (path) => await unlinkAsync(path)));

    // Construct product data incluyendo URLs de imágenes
    const productData = {
      ...req.body,
      images: cloudinaryData,
    };

    // Crear producto en la base de datos
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const images = await uploadImagesToCloudinary(req.files);
    const updatedProductData = { ...req.body, images };
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.remove();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
