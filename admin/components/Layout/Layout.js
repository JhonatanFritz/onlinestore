// Layout.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import withAuth from '@/components/withAuth/withAuth'
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Obtener datos del admin almacenados en localStorage al cargar el componente
    const storedAdminData = JSON.parse(localStorage.getItem("adminData") || "{}");
    setAdminData(storedAdminData);
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Sidebar adminData={adminData} />

      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default withAuth(Layout);
