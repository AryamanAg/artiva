import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Group cart items by product id
  const grouped = cart.reduce((acc, item) => {
    const existing = acc[item.id];
    if (existing) {
      existing.quantity += 1;
    } else {
      acc[item.id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});
  const items = Object.values(grouped);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg">Your cart is empty 😕</p>
            <Link href="/" className="inline-block mt-4 text-sm text-blue-600 underline">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full bg-gray-100 text-gray-900"
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-full bg-gray-100 text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right">
              <p className="text-xl font-semibold text-gray-800">
                Total: ₹{total}
              </p>

              <Link href="/checkout">
                <button className="mt-3 px-6 py-2 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-300 transition">
                  Proceed to Checkout →
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
