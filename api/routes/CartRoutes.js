// routes/cartRoutes.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Proteger las rutas con middleware de autenticación
router.use(authMiddleware);

// Obtener el carrito del usuario
router.get('/get', getCart);

// Agregar un producto al carrito
router.post('/add', addToCart);

// Eliminar un producto del carrito
router.delete('/remove/:productId', removeFromCart);

export default router;