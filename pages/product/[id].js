import { useState, useContext } from 'react';
import { products, colorMap } from '@/lib/products';
import { CartContext } from '@/context/CartContext';
import AccordionSection from '@/components/AccordionSection';
import PincodeChecker from '@/components/PincodeChecker';

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  const price =
    product.basePrice?.[selectedSize.toLowerCase()] !== undefined
      ? product.basePrice[selectedSize.toLowerCase()]
      : product.price;
  const displayedImage = product.images[selectedColor];
  const dimension =
    typeof product.dimension === 'object'
      ? product.dimension[selectedSize.toLowerCase()] || ''
      : product.dimension;
  const weight =
    typeof product.weight === 'object'
      ? product.weight[selectedSize.toLowerCase()] || ''
      : product.weight;
  const formattedColorName = (colorMap[selectedColor] || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-4 p-4">
          <img
            src={displayedImage}
            alt={product.title}
            className="w-full rounded-xl aspect-square object-contain"
          />
          <div className="flex gap-2 mt-4 justify-end">
            {product.colors.map((color) => (
              <button
                key={color}
                aria-label={(colorMap[color] || '')
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-700' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 text-right">
            {formattedColorName}
          </div>
          <p className="text-xl font-bold text-gray-800">₹{price}</p>
          <div className="flex flex-wrap gap-2">
            {['Small', 'Medium', 'Large', 'Set'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[72px] px-4 py-2 rounded-full border text-sm transition active:scale-95 ${
                  selectedSize === size
                    ? 'bg-gray-800 text-white cursor-default'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
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
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
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
              className="flex-1 px-6 py-3 rounded-full bg-[#ffce12] text-black font-bold hover:bg-[#e6bd0b] active:scale-95 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Column 2 */}
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Column 3 */}
        <div className="space-y-4 p-4 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-xs text-gray-600 space-y-2">
            <div className="flex flex-col items-center">
              <span>🔒</span>
              <span>Secure transaction</span>
            </div>
            <div className="flex flex-col items-center">
              <span>💰</span>
              <span>Pay on Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <span>🔄</span>
              <span>7-day return</span>
            </div>
          </div>
          <PincodeChecker />
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
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
          className="w-full px-6 py-3 rounded-full bg-[#ffce12] text-black font-bold hover:bg-[#e6bd0b] active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        <AccordionSection
          title="Design Description"
          isOpen={openSection === 0}
          onToggle={() => setOpenSection(openSection === 0 ? null : 0)}
        >
          <p>
            Elevate your home décor with Vasari by Artivo, crafted using precise
            3D printing technology. Featuring clean lines and a modern geometric
            silhouette, this vase is the perfect statement piece for
            contemporary interiors. The layered texture inherent in 3D printing
            adds a unique, tactile character, showcasing the craftsmanship behind
            every line & curve. Available in a variety of muted and vibrant
            colors, each vase is a blend of art, function, and technology.
            Flowers are not included with the vase as of now.
          </p>
        </AccordionSection>

        <AccordionSection
          title="Sustainability"
          isOpen={openSection === 1}
          onToggle={() => setOpenSection(openSection === 1 ? null : 1)}
        >
          <p>
            This vase is made from PLA (Polylactic Acid)—a biodegradable,
            plant-based material derived from renewable resources such as corn
            starch and sugarcane. Unlike petroleum-based plastics, PLA offers a
            lower carbon footprint and is industrially compostable under
            specific conditions. Our 3D printing process is waste-efficient,
            only using the material necessary for the final product, and our
            packaging is fully recyclable. With this vase, you're choosing a
            greener, more responsible way to decorate.
          </p>
        </AccordionSection>

        <AccordionSection
          title="Instructions for Use"
          isOpen={openSection === 2}
          onToggle={() => setOpenSection(openSection === 2 ? null : 2)}
        >
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>For Decorative Use:</strong> Ideal for dried flowers,
              artificial arrangements, or as a standalone sculpture.
            </li>
            <li>
              <strong>Not Watertight:</strong> PLA is porous and not suitable for
              holding water unless sealed. If using for live flowers, insert a
              watertight container inside the vase.
            </li>
            <li>
              <strong>Care Instructions:</strong> Clean with a dry or slightly
              damp cloth. Avoid prolonged exposure to direct sunlight or high
              heat, as PLA may warp at temperatures above 60°C (140°F).
            </li>
            <li>
              <strong>Indoor Use Recommended:</strong> Best suited for indoor
              settings to preserve its shape and appearance.
            </li>
          </ul>
        </AccordionSection>
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
