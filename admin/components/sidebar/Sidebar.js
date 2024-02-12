// Sidebar.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaCogs,
  FaTags,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const Sidebar = ({ adminData }) => {
  const router = useRouter();
  const handleLogout = () => {
    // Elimina el token del Local Storage
    localStorage.removeItem("token");

    // Redirige al usuario a la página de inicio de sesión
    router.push("/");
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <p>TechMart</p>
      </div>
      {adminData && (
        <div className={styles.userData}>
          <div className={styles.imgContainer}>
            <Image
              className={styles.userImage}
              src={adminData.image.secureUrl}
              alt="Admin"
              width={120}
              height={120}
            />
            <span className={styles.userType}>{adminData.user}</span>
          </div>
          <p>{adminData.name}</p>
          <p>{adminData.lastname}</p>
          <p className={styles.userEmail}>{adminData.email}</p>
        </div>
      )}

      <ul>
        <li>
          <FaTachometerAlt />
          <Link href="/dashboard/">Dashboard</Link>
        </li>
        <li>
          <FaUsers />
          <Link href="/products/">Productos</Link>
        </li>
        <li>
          <FaShoppingCart />
          <Link href="/sales/">Ventas</Link>
        </li>
        <li>
          <FaTags />
          <Link href="/category/">Categorías</Link>
        </li>
        <li>
          <FaCogs />
          <Link href="/config/">Configuración</Link>
        </li>
        <span className={styles.closeSessionBtn} onClick={handleLogout}>
          <FaSignOutAlt />
          Cerrar Sesión
        </span>
      </ul>
    </div>
  );
};

export default Sidebar;
