// src/routes/adminRoutes.js
import express from "express";
import upload from "../middlewares/multerConfig.js";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginRules } from "../middlewares/loginRules.js";
import { adminRegisterRules } from "../middlewares/adminRegisterRules.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import subcategoryRoutes from "./subcategoryRoutes.js";
import subcategoryByCategoryRoutes from "./subcategoryByCategoryRoutes.js"
import cartRoutes from "../routes/CartRoutes.js"

const router = express.Router();
// Rutas de administradores
router.post(
  "/register",
  upload.single("image"),
  validate(adminRegisterRules),
  registerAdmin
);
router.post("/login", validate(loginRules), loginAdmin);

// Montar las rutas de productos bajo /products
router.use("/products", productRoutes);

//Rutas para Categorias
router.use("/category", categoryRoutes);

//Rutas para subCategorias
router.use("/subcategory", subcategoryRoutes);

//Rutas para subCategorias por Categorias
router.use("/subcategoryid", subcategoryByCategoryRoutes);

//Rutas para carrito de compras
router.use("/cart", cartRoutes)

export default router;
