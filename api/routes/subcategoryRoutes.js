// routes/subcategoryRoutes.js
import express from 'express';
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  obtenerSubcategoriasPorCategoria
} from '../controllers/subcategoryControllers.js';

const router = express.Router();

router.get('/', getAllSubcategories);
router.get('/:subcategoryId', getSubcategoryById);
router.post('/create', createSubcategory);
router.patch('/:subcategoryId/update', updateSubcategory);
router.delete('/:subcategoryId/delete', deleteSubcategory);

export default router;
