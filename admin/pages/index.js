import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}login`, {
        user,
        password,
      });

      // Almacenar el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Decodificar el token para obtener los datos del admin
      const decodedToken = jwt.decode(response.data.token);

      // Imprimir el contenido del decodedToken
      console.log("Decoded Token:", decodedToken);

      // Verifica si los datos del admin están presentes en el token
      if (decodedToken) {
        // Almacenar los datos del admin en localStorage
        localStorage.setItem("adminData", JSON.stringify(decodedToken));
        // Mostrar el toast de inicio de sesión exitoso
        toast.success("Inicio de sesión exitoso", { position: "top-right" });
        // Redirige al dashboard
        router.push("/dashboard/");
      } else {
        // El token no contiene los datos esperados
        console.error("El token no contiene los datos del admin esperados");
        // Muestra el toast de error
        toast.error("Error en el inicio de sesión", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      // Muestra el toast de error
      toast.error("Error en el inicio de sesión", { position: "top-right" });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <main>
        <p className={styles.loginTitle}>
          Bienvenido a <span>TechMart</span>
        </p>
        <p className={styles.loginHead}>Iniciar sesión</p>
        <div className={styles.loginForm}>
          <label>
            Usuario:
            <input
              type="text"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className={styles.loginBtn} onClick={handleLogin}>
          Iniciar sesión
        </button>
      </main>
      <div className={styles.loginPresentation}>
        <div className={styles.loginMainText}>
          <span>Gestiona tu tienda on-line con </span>
          <h1>TechMart</h1>
        </div>
        <div className={styles.loginMainImage}>
          <img src="./panel.jpg" alt="Product" />
        </div>
      </div>
    </div>
  );
}
