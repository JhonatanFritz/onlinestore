import { useRouter } from 'next/router';

function EditProduct() {
  const router = useRouter();
  const productId = router.query.productId;

  console.log(productId);

  return (
    <div>
      <h1>Editar Producto</h1>
      <p>ID del Producto: {productId}</p>
      {/* Aquí puedes agregar el formulario de edición del producto */}
    </div>
  );
}

export default EditProduct;
