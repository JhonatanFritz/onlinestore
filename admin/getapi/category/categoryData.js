// api.js

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener todas las categorías
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Función para crear una nueva categoría
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/category`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Función para editar una categoría existente
export const editCategory = async (categoryId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/category/${categoryId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};

// Función para eliminar una categoría
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// obtener subcategorias por categoria
export const getAllSubcategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subcategoryid/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    throw error;
  }
};
// Listar sub categorias
export const getAllSubcategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subcategory`
    );
    return response.data;

  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    throw error;
  }
};
