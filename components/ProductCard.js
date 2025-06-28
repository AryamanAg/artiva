import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import { colorMap } from '@/lib/products';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [added, setAdded] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const price =
    product.basePrice?.[selectedSize.toLowerCase()] !== undefined
      ? product.basePrice[selectedSize.toLowerCase()]
      : product.price;

  const formatColorName = (color) =>
    (colorMap[color] || color)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      color: selectedColor,
      price,
      image: product.images[selectedColor],
      quantity: 1,
    });
    setAdded(true);
  };

  return (
    <div className="relative rounded-xl shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-visible">
      {added && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-xs text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100 text-green-600 text-2xl">✓</div>
            <p className="text-lg font-semibold mb-4">Added to Cart</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setAdded(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
              <Link href="/cart" className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
      <Link href={`/product/${product.id}`}>
        <img
          src={product.images[selectedColor]}
          alt={product.title}
          className="w-full object-cover rounded"
        />
      </Link>

      <div className="p-4 flex flex-col space-y-3">
        <Link href={`/product/${product.id}`} className="block hover:underline">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h2>
        </Link>
        <p className="text-lg font-bold text-gray-800">₹{price}</p>

        <div className="space-y-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColors((s) => !s)}
              className="w-full flex justify-between items-center border rounded p-2"
            >
              <span className="flex items-center">
                <span
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: selectedColor }}
                />
                {formatColorName(selectedColor)}
              </span>
              <svg
                className="ml-2 w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showColors && (
              <div className="absolute z-20 mt-1 bg-white border rounded w-full shadow">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setShowColors(false);
                    }}
                    className="w-full flex items-center px-3 py-1 text-left hover:bg-gray-100"
                  >
                    <span
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    {formatColorName(color)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <select
              className="w-full border rounded p-2 appearance-none"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {['Small', 'Medium', 'Large'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 px-4 text-sm font-medium bg-gray-100 text-gray-900 rounded-full hover:bg-gray-300 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
