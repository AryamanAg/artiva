import { useState, useContext } from 'react';
import { products, colorMap } from '@/lib/products';
import { CartContext } from '@/context/CartContext';

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);

  const price =
    product.basePrice?.[selectedSize.toLowerCase()] !== undefined
      ? product.basePrice[selectedSize.toLowerCase()]
      : product.price;
  const displayedImage = product.images[selectedColor];

  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:w-1/2">
          <img
            src={displayedImage}
            alt={product.title}
            className="w-full rounded-xl aspect-square object-contain"
          />
          <div className="flex gap-2 mt-4">
            {product.colors.map((color) => (
              <button
                key={color}
                aria-label={colorMap[color] || color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-700' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {colorMap[selectedColor]}
          </div>
        </div>

        <div className="flex-1 md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-xl font-bold text-gray-800 mb-1">₹{price}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
            <span className="flex items-center gap-1 px-2 py-1 border rounded-full">
              🔒 <span>Secure transaction</span>
            </span>
            <span className="flex items-center gap-1 px-2 py-1 border rounded-full">
              💰 <span>Pay on Delivery</span>
            </span>
            <span className="flex items-center gap-1 px-2 py-1 border rounded-full">
              🔄 <span>7-day return</span>
            </span>
            <span className="flex items-center gap-1 px-2 py-1 border rounded-full">
              📦 <span>In-stock</span>
            </span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            {['Small', 'Medium', 'Large', 'Set'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border text-sm transition hover:bg-gray-200 active:scale-95
                  ${selectedSize === size ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center outline-none"
                min={1}
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  size: selectedSize,
                  color: selectedColor,
                  price,
                  image: displayedImage,
                  quantity,
                })
              }
              className="flex-1 px-6 py-3 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-300 active:scale-95 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = products.map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id === params.id) || null;
  return { props: { product } };
}
