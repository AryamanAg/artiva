import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const defaultSize = 'Medium';
  const price =
    product.basePrice?.[defaultSize.toLowerCase()] !== undefined
      ? product.basePrice[defaultSize.toLowerCase()]
      : product.price;
  const quantity = cart.filter(
    (c) =>
      c.id === product.id &&
      c.size === defaultSize &&
      c.color === selectedColor
  ).length;

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.images[selectedColor]}
          alt={product.title}
          className="w-full object-cover rounded"
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.id}`}
          className="block hover:underline">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h2>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-gray-800">₹{price}</p>

<div className="flex gap-2 mt-3">
  {product.colors.map((color) => (
    <button
      key={color}
      onClick={() => setSelectedColor(color)}
      className={`w-5 h-5 rounded-full border-2 ${selectedColor === color ? 'border-gray-700' : 'border-transparent'}`}
      style={{ backgroundColor: color }}
    />
  ))}
</div>

        </div>

<div className="mt-auto flex items-center justify-between gap-2">
  <button
    onClick={() =>
      addToCart({
        id: product.id,
        title: product.title,
        size: defaultSize,
        color: selectedColor,
        price,
        image: product.images[selectedColor],
      })
    }
    className="py-2 px-4 text-sm font-medium bg-gray-100 text-gray-900 rounded-full hover:bg-gray-300 transition"
  >
    + Add to Cart
  </button>
  
  {quantity > 0 && (
    <span className="text-sm text-gray-600">In cart: {quantity}</span>
  )}
</div>

      </div>
    </div>
  );
}
