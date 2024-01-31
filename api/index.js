// index.js
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db/dbConection.js";
import cors from "cors";
import "dotenv/config";
import adminRoutes from "./routes/adminRoutes.js"; // Ajusta la ruta según tu estructura

const app = express();
const { PORT } = process.env;

// Conectar a la base de datos
connectDB();

// Middleware de CORS
app.use(cors());
app.use(bodyParser.json());

// Rutas de administradores
app.use("/admin", adminRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
