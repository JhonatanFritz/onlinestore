// controllers/cartController.js
import Cart from '../models/Cart.js';

// Obtener el carrito del usuario
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting the cart' });
  }
};

// Agregar un producto al carrito
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    // Si el carrito no existe, lo creamos
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // Si el carrito ya existe, verificamos si el producto está en el carrito
      const existingProduct = cart.products.find((p) => p.productId.equals(productId));

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        existingProduct.quantity += quantity;
      } else {
        // Si el producto no está en el carrito, lo agregamos
        cart.products.push({ productId, quantity });
      }
    }

    // Guardamos el carrito actualizado en la base de datos
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding product to the cart' });
  }
};

// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    // Filtramos los productos del carrito, excluyendo el producto a eliminar
    cart.products = cart.products.filter((p) => !p.productId.equals(productId));

    // Guardamos el carrito actualizado en la base de datos
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing product from the cart' });
  }
};

export { getCart, addToCart, removeFromCart };
