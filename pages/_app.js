// pages/_app.js
import { CartProvider } from '@/context/CartContext';
import { LocationProvider } from '@/context/LocationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/context/ToastContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <LocationProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </LocationProvider>
    </CartProvider>
  );
}
