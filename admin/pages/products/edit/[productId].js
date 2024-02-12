import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import HeadForPage from "@/components/pageHead/HeadForPage";
import EditProductForm from "@/components/Edit/editProductForm";

function EditProduct() {
  const router = useRouter();
  const productId = router.query.productId;

  return (
    <Layout>
      <HeadForPage title="Editar Producto"></HeadForPage>
     
      <EditProductForm productId={productId}></EditProductForm>
    </Layout>
  );
}

export default EditProduct;
