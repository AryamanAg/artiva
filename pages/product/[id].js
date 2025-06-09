import { useState, useContext } from 'react';
import { sampleProducts } from '@/lib/data';
import { CartContext } from '@/context/CartContext';

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.images[selectedColor]}
            alt={product.title}
            className="w-full rounded-xl object-cover aspect-square"
          />
          <div className="flex gap-2 mt-4">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-700' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-xl font-bold text-gray-800 mb-6">₹{product.price}</p>
          <button
            onClick={() =>
              addToCart({ ...product, selectedColor, image: product.images[selectedColor] })
            }
            className="w-full md:w-auto px-6 py-3 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-300 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = sampleProducts.map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = sampleProducts.find((p) => p.id === params.id) || null;
  return { props: { product } };
}
