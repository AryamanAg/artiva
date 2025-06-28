import { createContext, useState, useEffect } from 'react';
import { colorMap } from '@/lib/products';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const formatColorName = (color) =>
    (colorMap[color] || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const withAttrs = parsed.map((i) => ({
            ...i,
            quantity: i.quantity ?? 1,
            colorName: i.colorName || formatColorName(i.color),
          }));
          const deduped = [];
          withAttrs.forEach((i) => {
            const index = deduped.findIndex(
              (p) => p.id === i.id && p.size === i.size && p.color === i.color
            );
            if (index !== -1) {
              deduped[index].quantity += i.quantity;
            } else {
              deduped.push({ ...i });
            }
          });
          setCart(deduped);
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
    const quantity = item.quantity ?? 1;
    const colorName = item.colorName || formatColorName(item.color);
    setCart((prev) => {
      const index = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (index !== -1) {
        const next = [...prev];
        next[index] = {
          ...next[index],
          quantity: next[index].quantity + quantity,
        };
        return next;
      }
      return [...prev, { ...item, quantity, colorName }];
    });
  };

  // Decrease quantity of a specific variant in the cart
  const removeFromCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (index === -1) return prev;
      const next = [...prev];
      if (next[index].quantity > 1) {
        next[index] = {
          ...next[index],
          quantity: next[index].quantity - 1,
        };
      } else {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
