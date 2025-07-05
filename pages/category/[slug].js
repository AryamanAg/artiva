import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import Head from 'next/head';

export default function CategoryPage({ slug, items }) {
  const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Artiva`;
  const description = `Explore the ${slug} collection from Artiva.`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/artiva-logo.webp" />
        <meta property="og:url" content={`https://yourdomain.com/category/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/artiva-logo.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: items.map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                url: `https://yourdomain.com/product/${p.id}`,
                name: p.title,
              })),
            }),
          }}
        />
      </Head>
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
    </>
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
