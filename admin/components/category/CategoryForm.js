import React, { useState } from "react";
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar lógica para enviar los datos del formulario
    console.log("Datos enviados:", categoryData);
  };

  return (
    <form className={styles.categoryForm} onSubmit={handleSubmit}>
      <h3>Categorías</h3>
      {/* Nombre */}
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
        />
      </label>

      {/* Descripción */}
      <label>
        Descripción:
        <textarea
          name="description"
          value={categoryData.description}
          onChange={handleChange}
        />
      </label>

      {/* Botón de envío */}
      <button type="submit">Guardar Categoría</button>
    </form>
  );
}

export default CategoryForm;
