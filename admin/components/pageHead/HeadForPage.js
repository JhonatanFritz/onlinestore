import React from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./HeadForPage.module.css";
function HeadForPage({ title }) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={styles.headTitle}>
      <div className={styles.backArrowBox} onClick={handleGoBack}>
        <FaArrowLeft />
      </div>
      <span>{title}</span>
    </div>
  );
}

export default HeadForPage;
