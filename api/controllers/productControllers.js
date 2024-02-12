// controllers/productController.js
import Product from "../models/Product.js";
import fs from "fs";
import { promisify } from "util";
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
    console.log("Datos del Request:", req.body);
    console.log("Datos de los Archivos:", req.files);
    const localPaths = req.files.map((file) => file.path);
    console.log("Paths de imágenes locales:", localPaths);

    // Subir imágenes a Cloudinary
    const cloudinaryData = await uploadImages(localPaths);

    console.log("Respuesta de Cloudinary:", cloudinaryData);

    // Eliminar imágenes locales después de subirlas a Cloudinary
    await Promise.all(localPaths.map(async (path) => await unlinkAsync(path)));

    // Obtener IDs de la categoría y subcategoría desde la solicitud
    const { categoryId, subcategoryId } = req.body;

    // Verificar si las categorías y subcategorías existen en la base de datos

    // Aquí asumimos que tienes funciones como createCategory y createSubcategory
    // para crear nuevas categorías y subcategorías si no existen

    // Ejemplo hipotético:
    // const category = await Category.findById(categoryId);
    // const subcategory = await Subcategory.findById(subcategoryId);

    // Construir datos del producto incluyendo URLs de imágenes y referencias a categoría y subcategoría
    const productData = {
      ...req.body,
      images: cloudinaryData,
      category: categoryId,
      subcategory: subcategoryId,
    };

    // Crear producto en la base de datos
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res;
    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  console.log("ID del producto a actualizar:", productId);
  console.log("Datos recibidos en req.body:", req.body);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Accede a los campos específicos del formulario
    const {
      name,
      description,
      price,
      stock,
      delivery,
      isOffer,
      offerPrice,
      category,
      subcategory,
    } = req.body;
    const updatedProductData = {
      name,
      description,
      price,
      stock,
      delivery,
      isOffer,
      offerPrice,
      category,
      subcategory,
    };
    console.log("Estos son los nuevos datos: ", updatedProductData);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    console.log("datos enviados a MongoDB: ", updatedProductData);
    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct, // Incluir el producto actualizado si es necesario
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

    await product.deleteOne(); // Utilizando deleteOne en lugar de remove

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
