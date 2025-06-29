import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const categories = [
    { slug: 'vasari', name: 'Vasari', image: '/vasari/amber-prism-ivory-sand.webp' },
    { slug: 'noctra', name: 'Noctra', image: '/def.jpg' },
    { slug: 'deskly', name: 'Deskly', image: '/xyz.webp' },
  ];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message || 'Subscribed!');
        setEmail('');
      } else {
        setStatus(data.message || 'Invalid email');
      }
    } catch {
      setStatus('Error subscribing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      <section className="relative h-[60vh] w-full">
        <Image src="/abc.webp" alt="Hero" fill priority className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Elevate Your Space</h1>
          <p className="text-lg md:text-xl mb-6 text-center">Modern Decor, Precisely 3D Printed</p>
          <Link href="/category/vasari" className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium">
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              href={`/category/${c.slug}`}
              key={c.slug}
              className="relative h-48 rounded-lg overflow-hidden group"
            >
              <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-semibold">Handcrafted Elegance</h2>
        <p className="text-gray-700">
          Artivo celebrates mindful living through timeless pieces crafted with passion.
        </p>
        <div className="relative w-full h-64 md:h-96">
          <Image src="/xyz.webp" alt="Lifestyle" fill className="object-cover rounded-lg" />
        </div>
      </section>
    </div>
  );
}

