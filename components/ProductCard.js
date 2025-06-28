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
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      {added && (
        <span className="absolute top-2 right-2 text-green-600 text-xl">✓</span>
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
              <span className="ml-2">▼</span>
            </button>
            {showColors && (
              <div className="absolute z-10 mt-1 bg-white border rounded w-full shadow">
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

          <select
            className="w-full border rounded p-2"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {['Small', 'Medium', 'Large'].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
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
