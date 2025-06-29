import { useState, useContext } from 'react';
import { products, sizeLabels } from '@/lib/products';
import { CartContext } from '@/context/CartContext';
import AccordionSection from '@/components/AccordionSection';
import PincodeChecker from '@/components/PincodeChecker';
import Head from 'next/head';

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  const title = `${product.title} - Artiva`;
  const description = product.description;

  const price = selectedColor.pricing[selectedSize];
  const displayedImage = selectedColor.image;
  const dimension =
    typeof product.dimension === 'object'
      ? product.dimension[selectedSize] || ''
      : product.dimension;
  const weight =
    typeof product.weight === 'object'
      ? product.weight[selectedSize] || ''
      : product.weight;

  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={displayedImage} />
        <meta property="og:url" content={`https://yourdomain.com/product/${product.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={displayedImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.title,
              image: [displayedImage],
              description: product.description,
              brand: { '@type': 'Brand', name: 'Artiva' },
              sku: product.id,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price,
                url: `https://yourdomain.com/product/${product.id}`,
              },
            }),
          }}
        />
      </Head>
      <div className="w-full mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-[80%] space-y-4 md:sticky md:top-24 self-start mx-auto">
          <img
            src={displayedImage}
            alt={product.title}
            width="500"
            height="500"
            className="w-full rounded-xl aspect-square object-contain"
          />
          <div className="flex gap-2 justify-end">
            {product.colors.map((color) => (
              <button
                key={color.hex}
                aria-label={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor.hex === color.hex ? 'border-gray-700' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 text-right">{selectedColor.name}</div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-xl font-bold text-gray-800">₹{price}</p>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="text-sm space-y-1 w-[80%]">
            <h2 className="font-semibold text-base">About this Item</h2>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Dimension</span>
                <span>{dimension}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span>{weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country of Origin</span>
                <span>{product.origin}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 text-xs text-gray-600 text-center gap-2 my-5 justify-items-start">
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

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[64px] md:min-w-[72px] px-4 py-2 rounded-full border text-xs md:text-sm transition active:scale-95
                  ${
                    selectedSize === size
                      ? 'bg-gray-800 text-white cursor-default'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
              >
                {sizeLabels[size] || size}
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
                  color: selectedColor.hex,
                  colorName: selectedColor.name,
                  price,
                  image: displayedImage,
                  quantity,
                })
              }
              className="w-full md:w-[50%] flex-1 px-6 py-3 rounded-full text-gray-900 active:scale-95 transition bg-[#ffce12] hover:bg-[#f7ca00]"
            >
              Add to Cart
            </button>
          </div>
          <PincodeChecker />
        </div>
      </div>

      <div className="mt-8 space-y-4">
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
    </>
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
