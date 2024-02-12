// routes/categoryRoutes.js
import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryControllers.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:categoryId', getCategoryById);
router.post('/create', createCategory);
router.patch('/:categoryId/update', updateCategory);
router.delete('/:categoryId/delete', deleteCategory);

export default router;
