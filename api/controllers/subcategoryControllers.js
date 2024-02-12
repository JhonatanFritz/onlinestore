// controllers/subcategoryControllers.js
import Subcategory from '../models/Subcategory.js';

const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching subcategories' });
  }
};

const getSubcategoryById = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching subcategory' });
  }
};

const createSubcategory = async (req, res) => {
  try {
    const { categoryId, name, description } = req.body;
    console.log(req.body.categoryId)

    const subcategory = new Subcategory({
      categoryId,
      name,
      description,
    });

    const savedSubcategory = await subcategory.save();

    res.status(201).json({ message: 'Subcategory created successfully', subcategory: savedSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating subcategory' });
  }
};

const updateSubcategory = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const { name, description } = req.body;

  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { name, description },
      { new: true }
    );
    res.status(200).json({ message: 'Subcategory updated successfully', subcategory: updatedSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating subcategory' });
  }
};

const deleteSubcategory = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!deletedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json({ message: 'Subcategory deleted successfully', subcategory: deletedSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting subcategory' });
  }
};
const obtenerSubcategoriasPorCategoria = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log('Category ID:', categoryId);

    // Puedes realizar la lógica de búsqueda en tu modelo
    const subcategorias = await Subcategory.find({ categoryId: categoryId });

    res.json(subcategorias);
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory, obtenerSubcategoriasPorCategoria };
