// routes/subcategoryRoutes.js
import express from 'express';
import {
  obtenerSubcategoriasPorCategoria
} from '../controllers/subcategoryByCategoryController.js';

const router = express.Router();

router.get('/:categoryId',obtenerSubcategoriasPorCategoria)

export default router;
