// src/routes/adminRoutes.js
import express from "express";
import upload from "../middlewares/multerConfig.js";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginRules } from "../middlewares/loginRules.js";
import { adminRegisterRules } from "../middlewares/adminRegisterRules.js";
import productRoutes from "./productRoutes.js";

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
export default router;
