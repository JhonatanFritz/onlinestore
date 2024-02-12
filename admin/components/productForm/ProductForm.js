// components/ProductForm.js

import React, { useState, useEffect } from "react";
import Image from "next/image";
import HeadForPage from "../pageHead/HeadForPage";
import {
  getAllCategories,
  getAllSubcategory,
} from "../../getapi/category/categoryData";

import { toast } from "react-toastify";
import { useRouter} from "next/router";
import { createProduct } from "@/getapi/product/producData";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onSubmit, title, backTo }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const router = useRouter()
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: null,
    isOffer: false,
    stock: 0,
    delivery: true,
    images: [],
    category: "", // Aquí puedes tener un campo de selección o algo similar
    subcategory: "", // Lo mismo para la subcategoría
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
  const cargarSubcategorias = async (categoriaId) => {
    // Lógica para cargar subcategorías asociadas a la categoría seleccionada
    try {
      const subcategoriasData = await getAllSubcategory(categoriaId);

      setSubcategorias(subcategoriasData);
    } catch (error) {
      console.error("Error al cargar subcategorías:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const previewImageUrls = [];
      const realImages = [];

      for (let i = 0; i < Math.min(selectedFiles.length, 5); i++) {
        const file = selectedFiles[i];
        const imageUrl = URL.createObjectURL(file);

        // Agregar la vista previa al array
        previewImageUrls.push(imageUrl);
        console.log("esto es Real previewImageUrls " + previewImageUrls);

        // Agregar el archivo real al array
        realImages.push(file);
      }

      // Actualizar el estado de las imágenes en productData
      setProductData((prevData) => ({
        ...prevData,
        images: realImages,
      }));
      console.log("esto es Real Image " + realImages);
      // Actualizar el estado de las vistas previas
      setPreviewImages(previewImageUrls);
    }
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
     

      // Llama a la función createProduct con los datos del producto
      const response = await createProduct(productData);

      // Verifica la respuesta del servidor
      if (response && response.success) {
        toast.success("Producto creado exitosamente", { position: "top-right" });
        //Reseteamos los campos del For
        setProductData({
          name: "",
          description: "",
          price: 0,
          offerPrice: null,
          isOffer: false,
          stock: 0,
          delivery: true,
          images: [],
          category: "",
          subcategory: "",
        });
        router.push("./")
      } else {
        console.error("Error al crear producto:", response ? response.error : "Respuesta indefinida");
        // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className={styles.productFormContainer}>
      <HeadForPage title={title} backTo={backTo} />
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
          <button type="submit">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
