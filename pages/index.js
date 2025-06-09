import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

const sampleProducts = [
  {
    id: '1',
    title: 'Ceramic Vase',
    price: 1200,
    images: { 'White': '/xyz.webp', 'Black': 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80'},
    colors: ['White', 'Black']
  },
  {
    id: '2',
    title: 'Terracotta Vase',
    price: 1500,
    images: { '#B55239': '/abc.webp', '#C99A6C': 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80'},
    colors: ['#B55239', '#C99A6C']
  },
  {
    id: '3',
    title: 'Minimal Grey Vase',
    price: 1800,
    images: { '#999999': '/def.jpg', '#333333': 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80'},
    colors: ['#999999', '#333333']
  },
];



export default function Home() {
  return (
    <>
	<main className="p-4 md:p-8 bg-gray-50 min-h-screen">
  		<h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
    		Explore Our Collection
  		</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
  {sampleProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

      </main>
    </>
  );
}
