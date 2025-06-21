import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (err) {
          console.error('Failed to parse cart from localStorage', err);
        }
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add a product variant (id + size + color) to the cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Remove the first occurrence of a specific variant from the cart
  const removeFromCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
