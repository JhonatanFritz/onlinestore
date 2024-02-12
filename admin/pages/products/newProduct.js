import React from "react";
import ProductForm from "@/components/productForm/ProductForm";
import Layout from "@/components/Layout/Layout";

function newProduct() {
    
  return (
    <Layout>
      <ProductForm title="Registrar nuevo producto" />
    </Layout>
  );
}

export default newProduct;
