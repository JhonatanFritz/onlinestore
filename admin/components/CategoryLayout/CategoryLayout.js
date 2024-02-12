import React, { useState, useEffect } from "react";
import CategoryForm from "../category/CategoryForm";
import SubCategoryForm from "../subCategory/SubCategoryForm";
import HeadForPage from "../pageHead/HeadForPage";
import CategoriesTable from "../category/categoryTable/CategoryTable";
import SubCategoryTable from "../subCategory/subCategoryTable/SubCategoryTable";
import {
  getAllCategories,
  getAllSubcategories,
} from "../../getapi/category/categoryData";
import styles from "./CategoryLayout.module.css";

function CategoryLayout() {
  const [categorias, setCategorias] = useState([]);
  const [subCategoria, setSubCategoria] = useState([]);
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
    const cargarSubCategorias = async () => {
      try {
        const subCategoriasData = await getAllSubcategories();
        setSubCategoria(subCategoriasData);
      } catch (error) {
        console.error("Error al cargar sub categorías:", error);
      }
    };

    cargarSubCategorias();
  }, []);
  return (
    <div className={styles.mainContainerCategory}>
      <HeadForPage title="Gestion de Categorías y Sub Categorias"></HeadForPage>
      <div className={styles.dataContainer}>
        <div className={styles.categoryContainerSide}>
          <CategoryForm></CategoryForm>
          <CategoriesTable categories={categorias}></CategoriesTable>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.subCategoryContainerSide}>
          <SubCategoryForm></SubCategoryForm>
          <SubCategoryTable subCategory={subCategoria}></SubCategoryTable>
        </div>
      </div>
    </div>
  );
}

export default CategoryLayout;
