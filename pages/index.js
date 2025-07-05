import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const categories = [
    { slug: 'vasari', name: 'Vasari', image: '/vasari/amber-prism-ivory-sand.webp' },
    { slug: 'noctra', name: 'Noctra', image: '/def.jpg' },
    { slug: 'deskly', name: 'Deskly', image: '/xyz.webp' },
  ];

  const title = 'Artiva - Modern 3D Printed Decor';
  const description =
    'Explore modern home decor 3D printed with precision. Shop vases, accessories and more from Artiva.';

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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/abc.webp" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/abc.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Artiva',
              url: 'https://yourdomain.com',
            }),
          }}
        />
      </Head>
      <div className="space-y-24">
      <section className="relative h-[60vh] w-full">
        <Image
          src="/abc.webp"
          alt="Artiva modern decor hero image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Elevate Your Space</h1>
          <p className="text-lg md:text-xl mb-6 text-center">Modern Decor, Precisely 3D Printed</p>
          <Link href="/category/vasari" className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200">
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

      <section className="max-w-6xl mx-auto px-4 text-center space-y-6 pb-12">
        <h2 className="text-2xl font-semibold">Why Choose Artivo?</h2>
        <p className="text-gray-700">
          We combine cutting-edge 3D printing technology with thoughtful design to create products that enhance your lifestyle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.732l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.732l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12l8.73-5.04" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v11" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold">Premium 3D Printing</h3>
            <p className="text-gray-600 text-sm">High-quality materials and precision printing for lasting beauty.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927a.75.75 0 011.902 0l.336 1.284a1.125 1.125 0 001.671.774l1.211-.698a.75.75 0 011.05.28l.665 1.152a1.125 1.125 0 00.828.586l1.292.167a.75.75 0 01.638.748v1.33a1.125 1.125 0 00.322.791l.942.95a.75.75 0 010 1.06l-.942.95a1.125 1.125 0 00-.322.791v1.33a.75.75 0 01-.638.748l-1.292.167a1.125 1.125 0 00-.828.586l-.665 1.152a.75.75 0 01-1.05.28l-1.211-.698a1.125 1.125 0 00-1.671.774l-.336 1.284a.75.75 0 01-1.902 0l-.336-1.284a1.125 1.125 0 00-1.671-.774l-1.211.698a.75.75 0 01-1.05-.28l-.665-1.152a1.125 1.125 0 00-.828-.586l-1.292-.167a.75.75 0 01-.638-.748v-1.33a1.125 1.125 0 00-.322-.791l-.942-.95a.75.75 0 010-1.06l.942-.95a1.125 1.125 0 00.322-.791v-1.33a.75.75 0 01.638-.748l1.292-.167a1.125 1.125 0 00.828-.586l.665-1.152a.75.75 0 011.05-.28l1.211.698a1.125 1.125 0 001.671-.774l.336-1.284z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-center">Engineered for Everyday Living</h3>
            <p className="text-gray-600 text-sm">Durable, lightweight, and made to last.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c4 0 7 2 8.5 5.5C20.3 10 19 12 16 13c-1.5.5-3.5 1.5-4 3-0.5-1.5-2.5-2.5-4-3-3-1-4.3-3-4.5-5.5C5 4 8 2 12 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s-5-3.5-5-8 5-7 5-7 5 2 5 7-5 8-5 8z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold">Sustainable &amp; Eco-friendly</h3>
            <p className="text-gray-600 text-sm">Uses biodegradable, plant-based material</p>
          </div>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c4.97-4.99 8.25-8.34 8.25-12a8.25 8.25 0 10-16.5 0c0 3.66 3.28 7.01 8.25 12z" />
              <circle cx="12" cy="9" r="2.25" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold">Made in India</h3>
            <p className="text-gray-600 text-sm">Designed and 3D printed right here in India</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

