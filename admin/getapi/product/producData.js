import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// Ajusta la URL base según tu configuración del backend
const getAuthToken = () => {
  return localStorage.getItem("token");
};
// Obtener todos los productos
export const getAllProducts = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}products`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Obtener un producto por su ID
export const getProductById = async (productId) => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  const authToken = getAuthToken();

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("offerPrice", productData.offerPrice);
  formData.append("stock", productData.stock);
  formData.append("categoryId", productData.category);
  formData.append("subcategoryId", productData.subcategory);

  // Añadir imágenes al FormData
  for (let i = 0; i < productData.images.length; i++) {
    formData.append("images", productData.images[i]);
  }

  try {
    const response = await axios.post(`${BASE_URL}products/create`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Verificar si response está definido y tiene una propiedad 'data'
    if (response && response.data) {
      return response.data;
    } else {
      console.error("Respuesta indefinida o sin propiedad 'data'");
      throw new Error("Respuesta indefinida o sin propiedad 'data'");
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

// Actualizar un producto por su ID
// getapi/product/productData.js

// ...

export const updateProduct = async (productId, productData) => {
  const authToken = getAuthToken();

  try {
    const response = await axios.patch(
      `${BASE_URL}products/${productId}/update`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json", // Usar application/json para enviar datos JSON
        },
      }
    );

    console.log("Datos enviados al backend: ", productData);

    if (response && response.data) {
      return response.data;
    } else {
      console.error("Respuesta nula o sin datos al actualizar producto");
      return { success: false, error: "Error al actualizar producto" };
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return {
      success: false,
      error: error.response.data || "Error al actualizar producto",
    };
  }
};

// ...

// Eliminar un producto por su ID
export const deleteProduct = async (productId) => {
  const authToken = getAuthToken();
  try {
    const response = await axios.delete(
      `${BASE_URL}products/${productId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json", // Usar application/json para enviar datos JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto por ID:", error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
