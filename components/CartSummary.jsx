import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import PincodeChecker from './PincodeChecker';

export default function CartSummary({
  className = '',
  collapsed = false,
  onToggle = () => {},
}) {
  const { cart } = useContext(CartContext);
  const maxShow = 3;
  const itemsToShow = cart.slice(0, maxShow);
  const remaining = cart.length - maxShow;

  return (
    <div
      className={`hidden md:flex fixed right-0 top-24 z-20 items-start ${className}`}
    >
      <aside
        className={`transition-transform duration-300 ${
          collapsed ? 'translate-x-[calc(100%+0.25rem)]' : ''
        }`}
      >
        <div className="border rounded-l-lg p-4 space-y-4 bg-white w-72">
          <PincodeChecker className="mt-0" />
          <div className="space-y-2 text-sm">
            {itemsToShow.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center gap-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm">₹{item.price * item.quantity}</p>
              </div>
            ))}
            {remaining > 0 && (
              <p className="text-xs text-gray-500">...and {remaining} more item(s)</p>
            )}
          </div>
          <div className="grid grid-cols-3 text-xs text-gray-600 text-center gap-2">
            <div className="flex flex-col items-center py-3">
              <span>🔒</span>
              <span>Secure transaction</span>
            </div>
            <div className="flex flex-col items-center py-3">
              <span>💰</span>
              <span>Pay on Delivery</span>
            </div>
            <div className="flex flex-col items-center py-3">
              <span>🔄</span>
              <span>7-day return</span>
            </div>
          </div>
          <Link href="/cart">
            <button className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded">
              Checkout
            </button>
          </Link>
        </div>
      </aside>
      <button
        onClick={() => onToggle()}
        aria-label={collapsed ? 'View cart' : 'Hide cart'}
        className="px-3 py-2 bg-gray-800 text-white rounded-r-lg ml-1"
      >
        {collapsed ? 'View Cart' : 'Hide Cart'}
      </button>
    </div>
  );
}
