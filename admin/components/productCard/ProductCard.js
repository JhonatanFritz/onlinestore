// components/ProductCard.js
import React, {useState} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { confirmAlert } from "react-confirm-alert"; // Asegúrate de instalar esta librería
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onDelete }) => {
  const router = useRouter();
  const handleEditClick = () => {
    const productId = product._id;
    router.push(`/products/edit/${productId}`);
  };
  //Para eliminar
  const handleDeleteClick = () => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este producto?",
      buttons: [
        {
          label: "Sí",
          onClick: () => onDelete(product._id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={product.images[0].secureUrl}
        alt="Product"
        width={120}
        height={120}
      />

      <div className={styles.details}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.subOptions}>
          <p className={styles.description}>Stock: {product.stock}</p>
        </div>
        <div className={styles.actButtons}>
          <span  className={styles.editBTN} onClick={handleEditClick}>Editar</span>
          <span className={styles.deleteBTN} onClick={handleDeleteClick}>Eliminar</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
