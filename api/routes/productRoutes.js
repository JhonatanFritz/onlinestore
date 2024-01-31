// routes/productRoutes.js
import express from 'express';
import upload from '../middlewares/multerConfig.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { adminProductRules } from '../middlewares/productValidationRules.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';

const router = express.Router();

// Proteger todas las rutas de productos con el middleware de autenticación
router.use(authMiddleware);

// Rutas de productos
router.post('/create', upload.array('images', 5), createProduct);
router.patch('/:productId/update', updateProduct);
router.delete('/:productId/delete', deleteProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);

export default router;
