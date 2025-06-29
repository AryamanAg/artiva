import { useContext, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import { ToastContext } from '@/context/ToastContext';
import { sizeLabels } from '@/lib/products';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showColors, setShowColors] = useState(false);
  const colorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorRef.current && !colorRef.current.contains(e.target)) {
        setShowColors(false);
      }
    };
    if (showColors) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColors]);
  const price = selectedColor.pricing[selectedSize];

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      color: selectedColor.hex,
      colorName: selectedColor.name,
      price,
      image: selectedColor.image,
      quantity: 1,
    });
    showToast();
  };

  return (
    <div className="relative rounded-xl shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-visible">
      <Link href={`/product/${product.id}`}>
        <img
          src={selectedColor.image}
          alt={product.title}
          className="w-full object-cover rounded"
        />
      </Link>

      <div className="p-4 pt-0 flex flex-col space-y-3">
        <Link href={`/product/${product.id}`} className="block hover:underline">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h2>
        </Link>
        <p className="text-lg font-bold text-gray-800">₹{price}</p>

        <div className="space-y-2">
          <div className="relative" ref={colorRef}>
            <button
              type="button"
              onClick={() => setShowColors((s) => !s)}
              className="w-full flex justify-between items-center border rounded p-2"
            >
              <span className="flex items-center">
                <span
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                {selectedColor.name}
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
              <div className="absolute z-50 mt-1 bg-white border rounded w-full shadow max-h-32 overflow-y-auto">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedColor(color);
                      setShowColors(false);
                    }}
                    className="w-full flex items-center px-3 py-1 text-left hover:bg-gray-100"
                  >
                    <span
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
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
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {sizeLabels[size] || size}
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
