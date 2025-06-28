import { createContext, useState, useCallback } from 'react';
import Link from 'next/link';

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center md:inset-auto md:bottom-4 md:right-4 md:items-end md:justify-end pointer-events-none z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-xs md:w-64 pointer-events-auto flex flex-col items-center md:flex-row md:items-center md:space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 text-xl md:mb-0 mb-2">✓</div>
            <p className="text-sm font-semibold md:text-left text-center flex-1">Added to Cart</p>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => setVisible(false)} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-300 transition">Continue Shopping</button>
              <Link href="/cart" className="px-3 py-1 text-xs font-medium bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">View Cart</Link>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
