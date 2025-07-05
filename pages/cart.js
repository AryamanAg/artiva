import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { sizeLabels } from '@/lib/products';
import Link from 'next/link';
import ConfirmModal from '@/components/ConfirmModal';
import Head from 'next/head';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const items = cart;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const title = 'Your Cart - Artiva';
  const description = 'Review items in your shopping cart and proceed to checkout.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/artiva-logo.webp" />
        <meta property="og:url" content="https://yourdomain.com/cart" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/artiva-logo.webp" />
      </Head>
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={() => setConfirmOpen(true)}
              className="text-sm px-3 py-1 border rounded-full text-gray-700 hover:bg-gray-100"
            >
              Clear Cart
            </button>
          )}
        </div>

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
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width="80"
                    height="80"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-gray-800">{item.title}</h2>
                    <p className="text-xs text-gray-500">
                      Size: {sizeLabels[item.size] || item.size}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <span>Color:</span>
                      <span
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="ml-1">{item.colorName}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item)}
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
      <ConfirmModal
        isOpen={confirmOpen}
        message="Are you sure you want to remove all items from your cart?"
        onConfirm={() => {
          clearCart();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
