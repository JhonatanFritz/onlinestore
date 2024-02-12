// controllers/subcategoryControllers.js
import Subcategory from '../models/Subcategory.js';

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

export { obtenerSubcategoriasPorCategoria };
