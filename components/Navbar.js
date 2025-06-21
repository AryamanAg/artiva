import Link from 'next/link';
import { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 shadow-sm sticky top-0 bg-white z-50 border-b">

        {/* LEFT: Burger on mobile, logo on desktop */}
        <div className="flex items-center gap-2">
          {/* Burger menu (only mobile) */}
          <button className="md:hidden text-xl mr-2" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/artiva-logo.webp" alt="logo" className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">Artiva</h1>
          </Link>
        </div>

        {/* CENTER: Nav links (desktop only) */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link href="/category/vasari">Vasari</Link>
          <Link href="/category/noctra">Noctra</Link>
          <Link href="/category/deskly">Deskly</Link>
        </div>

        {/* RIGHT: Cart icon */}
        <Link href="/cart" className="text-sm md:text-base">
          🛒 <span className="font-bold">{cart.length}</span>
        </Link>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 text-lg font-medium text-gray-800 z-40">
          <Link href="/category/vasari" onClick={() => setMenuOpen(false)}>Vasari</Link>
          <Link href="/category/noctra" onClick={() => setMenuOpen(false)}>Noctra</Link>
          <Link href="/category/deskly" onClick={() => setMenuOpen(false)}>Deskly</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>🛒 {cart.length}</Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-300 transition"
          >
          Close
          </button>

        </div>
      )}
    </>
  );
}
