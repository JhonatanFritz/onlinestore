import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../getapi/category/categoryData";
import styles from "./SubCategoryForm.module.css";

function SubCategoryForm() {
  const [categorias, setCategorias] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    description: "",
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubCategoryData({
      ...subCategoryData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar lógica para enviar los datos del formulario
    console.log("Datos enviados:", subCategoryData);
  };

  return (
    <form className={styles.subcategoryForm} onSubmit={handleSubmit}>
      <h3>Sub Categorías</h3>
      {/* Nombre */}
      <label className={styles.categoryData}>
        Seleccione una Categoría:
        <select
          name="category"
          value={categorias.category}
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
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={subCategoryData.name}
          onChange={handleChange}
          className={styles.subCategoryName}
        />
      </label>

      {/* Descripción */}
      <label>
        Descripción:
        <textarea
          name="description"
          value={subCategoryData.description}
          onChange={handleChange}
          className={styles.subCategoryDescription}
        />
      </label>

      {/* Botón de envío */}
      <button className={styles.subCategorybtn} type="submit">Guardar sub Categoría</button>
    </form>
  );
}

export default SubCategoryForm;
