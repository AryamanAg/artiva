import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';



export default function Home() {
  return (
    <>
	<main className="p-4 md:p-8 bg-gray-50 min-h-screen">
  		<h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
    		Explore Our Collection
  		</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

      </main>
    </>
  );
}
