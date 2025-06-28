import { createContext, useState, useCallback } from 'react';
import Link from 'next/link';

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto"></div>

          {/* Modal box */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-10/12 max-w-md z-10 pointer-events-auto flex flex-col items-center space-y-4">
            
            {/* Green checkmark */}
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              ✓
            </div>

            {/* Message */}
            <p className="text-center text-sm font-semibold">Added to Cart</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                onClick={() => setVisible(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
              <Link
                href="/cart"
                className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-full hover:bg-gray-700 transition text-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
