// components/productForm/EditProductForm.js

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  getAllCategories,
  getAllSubcategory,
} from "../../getapi/category/categoryData";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { updateProduct, getProductById } from "@/getapi/product/producData";
import styles from "./editProductForm.module.css";

const EditProductForm = ({ productId }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: 0,
    isOffer: false,
    stock: 0,
    delivery: true,
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasData = await getAllCategories();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId]);
  const loadProductData = async () => {
    try {
      const product = await getProductById(productId);

      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        offerPrice: product.offerPrice,
        isOffer: product.isOffer,
        stock: product.stock,
        delivery: product.delivery,
        category: product.category,
        subcategory: product.subcategory,
      });

      if (product.images && product.images.length > 0) {
        const previewImageUrls = product.images.map((image) => image.secureUrl);
        setPreviewImages(previewImageUrls);
      }
    } catch (error) {
      console.error("Error al cargar datos del producto:", error);
    }
  };

  const cargarSubcategorias = async (categoriaId) => {
    try {
      const subcategoriasData = await getAllSubcategory(categoriaId);
      setSubcategorias(subcategoriasData);
    } catch (error) {
      console.error("Error al cargar subcategorías:", error);
    }
  };

  const handleFileChange = (event) => {
    // ... (mismo código que el formulario de creación)
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Manejar cambios según el tipo de campo
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Manejar cambios específicos para el campo de categoría
    if (name === "category") {
      cargarSubcategorias(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProduct(productId, productData);
      
      console.log(response); // Agrega esta línea para depurar
      

      if (response && response.success) {
        toast.success("Producto actualizado exitosamente", {
          position: "top-right",
        });
        router.push("../");
        console.log("Respuesta exitosa");
      } else {
        const errorMessage =
          response && response.error ? response.error : "Error desconocido";
        toast.error(`No se pudo guardar los cambios: ${errorMessage}`, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  };

  return (
    <div className={styles.productFormContainer}>
      <form className={styles.productForm} onSubmit={handleSubmit}>
        <div className={styles.elementsFormContainer}>
          <div className={styles.leftSideForm}>
            {/* Nombre */}
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </label>
            {/* Descripción */}
            <label>
              Descripción:
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </label>
            <div className={styles.priceGroup}>
              {/* Precio */}
              <label>
                Precio:
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
              </label>

              {/* Precio de oferta */}
              <label>
                Precio de oferta:
                <input
                  type="number"
                  name="offerPrice"
                  value={productData.offerPrice || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles.categoryGroup}>
              {/* Categoría (usando un campo de selección) */}
              <label>
                Categoría:
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.name}
                    </option>
                  ))}
                </select>
              </label>
              {/* Subcategoría (usando un campo de selección) */}
              <label>
                Subcategoría:
                <select
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una subcategoría</option>
                  {subcategorias.map((subcategoria) => (
                    <option key={subcategoria._id} value={subcategoria._id}>
                      {subcategoria.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {/* Imágenes (puedes agregar más lógica para manejar múltiples imágenes) */}
          <div className={styles.rightSideForm}>
            <div className={styles.subGroupForm}>
              {/* Stock */}
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                />
              </label>

              {/* ¿Oferta activa? */}
              <label>
                ¿Oferta activa?
                <input
                  type="checkbox"
                  name="isOffer"
                  checked={productData.isOffer}
                  onChange={handleChange}
                />
              </label>

              {/* Entrega */}
              <label>
                ¿Entrega disponible?
                <input
                  type="checkbox"
                  name="delivery"
                  checked={productData.delivery}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label className={styles.imgLabel}>
              Imágenes:
              <div className={styles.customFileInput}>
                Seleccionar Archivos
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  accept="images/*"
                  className={styles.inputImages}
                  multiple // Permite la selección de múltiples archivos
                />
              </div>
            </label>
            <div className={styles.imagePreviews}>
              {previewImages.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Preview ${index + 1}`}
                  width={150}
                  height={150}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.btnFormContainer}>
          {/* Botón de envío */}
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
