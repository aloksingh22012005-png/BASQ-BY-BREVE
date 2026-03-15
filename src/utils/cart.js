// src/utils/cart.js
// Cart management using localStorage

const CART_KEY = 'basq_cart';

/**
 * Get cart items
 */
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

/**
 * Save cart to localStorage
 */
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Dispatch custom event to update navbar cart count
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

/**
 * Add item to cart
 */
export const addToCart = (food) => {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item._id === food._id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...food, quantity: 1 });
  }

  saveCart(cart);
};

/**
 * Update item quantity
 */
export const updateCartQuantity = (foodId, quantity) => {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item._id !== foodId);
  } else {
    cart = cart.map((item) =>
      item._id === foodId ? { ...item, quantity } : item
    );
  }
  saveCart(cart);
};

/**
 * Remove item from cart
 */
export const removeFromCart = (foodId) => {
  const cart = getCart().filter((item) => item._id !== foodId);
  saveCart(cart);
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

/**
 * Get total cart count (number of items)
 */
export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Get cart total price
 */
export const getCartTotal = () => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};
