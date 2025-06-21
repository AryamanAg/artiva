import { useState } from 'react';

export default function Footer() {
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
    } catch (err) {
      setStatus('Error subscribing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-4 text-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Branding + Newsletter */}
        <div className="flex-1 min-w-[240px] flex flex-col items-center text-left">
          <h2 className="text-xl font-bold mb-2">Artivo</h2>
          <p className="mb-4">Timeless decor, delivered with care.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[180px] flex flex-col items-center text-left">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/category/vasari">Vasari</a></li>
            <li><a href="/category/noctra">Noctra</a></li>
            <li><a href="/category/deskly">Deskly</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-[180px] flex flex-col items-center text-left">
          <h3 className="font-semibold mb-2">Info</h3>
          <ul className="space-y-1">
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="mailto:support@artiva.in">support@artiva.in</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Artivo. All rights reserved.
      </div>
    </footer>
  );
}
