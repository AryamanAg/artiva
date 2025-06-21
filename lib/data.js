export const sampleProducts = [
  {
    id: '1',
    title: 'Ceramic Vase',
    price: 1200,
    images: {
      White: '/xyz.webp',
      Black: 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80',
    },
    colors: ['White', 'Black'],
    sizes: {
      Small: { price: 1000, image: '/xyz.webp' },
      Medium: { price: 1200, image: '/xyz.webp' },
      Large: { price: 1400, image: '/xyz.webp' },
    },
  },
  {
    id: '2',
    title: 'Terracotta Vase',
    price: 1500,
    images: {
      '#B55239': '/abc.webp',
      '#C99A6C': 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80',
    },
    colors: ['#B55239', '#C99A6C'],
    sizes: {
      Small: { price: 1300, image: '/abc.webp' },
      Medium: { price: 1500, image: '/abc.webp' },
      Large: { price: 1700, image: '/abc.webp' },
    },
  },
  {
    id: '3',
    title: 'Minimal Grey Vase',
    price: 1800,
    images: {
      '#999999': '/def.jpg',
      '#333333': 'https://images.unsplash.com/photo-1585238341986-5b54c1f86c15?auto=format&fit=crop&w=600&q=80',
    },
    colors: ['#999999', '#333333'],
    sizes: {
      Small: { price: 1600, image: '/def.jpg' },
      Medium: { price: 1800, image: '/def.jpg' },
      Large: { price: 2000, image: '/def.jpg' },
    },
  },
];
