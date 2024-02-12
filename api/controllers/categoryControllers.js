// controllers/categoryControllers.js
import Category from '../models/Category.js';

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching category' });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: savedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting category' });
  }
};

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
