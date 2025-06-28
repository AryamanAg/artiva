import Link from 'next/link';
import { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { LocationContext } from '@/context/LocationContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { pincode, address, setAddress, setPincode } = useContext(LocationContext);
  const [addressOpen, setAddressOpen] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-1 shadow-sm sticky top-0 bg-white z-50 border-b">

        {/* LEFT: Burger on mobile, logo on desktop */}
        <div className="flex items-center gap-2">
          {/* Burger menu (only mobile) */}
          <button className="md:hidden text-xl mr-2" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/artiva-logo.webp" alt="logo" className="w-6 h-6" />
              <h1 className="text-xl font-bold tracking-tight">Artivo</h1>
          </Link>
        </div>

        {/* CENTER: Nav links (desktop only) */}
        <div className="hidden md:flex gap-8 text-base font-medium text-gray-700 ">
          <Link href="/category/vasari" className="px-4 py-2 rounded-full bg-transparent hover:bg-gray-100 transition-colors duration-200">Vasari</Link>
          <Link href="/category/noctra" className="px-4 py-2 rounded-full bg-transparent hover:bg-gray-100 transition-colors duration-200">Noctra</Link>
          <Link href="/category/deskly" className="px-4 py-2 rounded-full bg-transparent hover:bg-gray-100 transition-colors duration-200">Deskly</Link>
        </div>

        {/* RIGHT: Location + Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAddressOpen(true)}
            className="text-sm md:text-base flex items-center gap-1"
          >
            📍
            {pincode ? `Deliver to ${pincode}` : 'Set Delivery Location'}
          </button>
          <Link href="/cart" className="text-sm md:text-base">
            🛒 <span className="font-bold">{itemCount}</span>
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 text-lg font-medium text-gray-800 z-40">
          <Link href="/category/vasari" onClick={() => setMenuOpen(false)}>Vasari</Link>
          <Link href="/category/noctra" onClick={() => setMenuOpen(false)}>Noctra</Link>
          <Link href="/category/deskly" onClick={() => setMenuOpen(false)}>Deskly</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>🛒 {itemCount}</Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-300 transition"
          >
          Close
          </button>

        </div>
      )}

      {addressOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Delivery Address</h2>
              <button onClick={() => setAddressOpen(false)}>✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const addr = {
                  name: form.name.value,
                  street: form.street.value,
                  city: form.city.value,
                  state: form.state.value,
                  phone: form.phone.value,
                  pincode: form.pincode.value,
                };
                setAddress(addr);
                setPincode(form.pincode.value);
                setAddressOpen(false);
              }}
              className="space-y-2"
            >
              <input name="name" defaultValue={address?.name || ''} placeholder="Name" className="w-full border px-3 py-2 rounded" />
              <input name="street" defaultValue={address?.street || ''} placeholder="Street" className="w-full border px-3 py-2 rounded" />
              <input name="city" defaultValue={address?.city || ''} placeholder="City" className="w-full border px-3 py-2 rounded" />
              <input name="state" defaultValue={address?.state || ''} placeholder="State" className="w-full border px-3 py-2 rounded" />
              <input name="phone" defaultValue={address?.phone || ''} placeholder="Phone" className="w-full border px-3 py-2 rounded" />
              <input name="pincode" defaultValue={address?.pincode || pincode || ''} placeholder="Pincode" className="w-full border px-3 py-2 rounded" />
              <button type="submit" className="w-full bg-gray-800 text-white rounded py-2">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
