import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function CategoryPage({ slug, items }) {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 capitalize text-center">
        {slug}
      </h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const categories = ['vasari', 'noctra', 'deskly'];
  const paths = categories.map((c) => ({ params: { slug: c } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const items = products.filter((p) => p.category.toLowerCase() === slug);
  return { props: { slug, items } };
}
