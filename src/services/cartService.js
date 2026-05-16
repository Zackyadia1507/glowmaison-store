const CART_KEY = "glowmaison_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
}