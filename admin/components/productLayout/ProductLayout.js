import React, { useState, useEffect } from "react";
import { FaPlus, FaDownload, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProductCard from "../productCard/ProductCard";
import { getAllProducts, deleteProduct } from "@/getapi/product/producData";
import styles from "./ProductLayout.module.css";

function ProductLayout() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Llamar a la función para obtener todos los productos
    getAllProductsFromApi();
  }, []);
  const getAllProductsFromApi = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
  const handleNewProduct = () => {
    router.push("/products/newProduct");
  };
  const handleEditProduct = (id) => {
    // router.push("/products/editProduct");
    console.log("Editando un producto " + id);
  };
  const handleDeleteProduct = async (productId) => {
    try {
      // Lógica para eliminar el producto
      await deleteProduct(productId);
      toast.info("Producto eliminado correctamente", { position: "top-right" });
      // Otros pasos después de la eliminación si es necesario
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      // Manejar el error si es necesario
    }
  };
  return (
    <div className={styles.productLayoutContainer}>
      <div className={styles.productHead}>
        <span>Gestión de Productos</span>
        <div className={styles.productOptions}>
          <div className={styles.searchContainer}>
            <div className={styles.searchIconBox}>
              <FaSearch></FaSearch>
            </div>
            <input
              type="search"
              placeholder="Escribe algo aqui..."
              className={styles.searchInput}
            />
          </div>
          <div className={styles.iconsOptionsContaner}>
            <div className={styles.searchIconBox} onClick={handleNewProduct}>
              <FaPlus></FaPlus>
            </div>
            <div className={styles.searchIconBox} onClick={handleEditProduct}>
              <FaDownload></FaDownload>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.producContainer}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            editProduct={handleEditProduct}
            onDelete={handleDeleteProduct}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductLayout;
