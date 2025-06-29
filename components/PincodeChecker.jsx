import { useState, useContext, useEffect } from 'react';
import { LocationContext } from '@/context/LocationContext';

export default function PincodeChecker() {
  const { pincode, setPincode } = useContext(LocationContext);
  const [inputPin, setInputPin] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setInputPin(pincode || '');
  }, [pincode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage('');
    if (!inputPin) return;
    const valid = /^\d{6}$/.test(inputPin);
    if (!valid) {
      setMessage('Invalid pincode');
      return;
    }

    try {
      const res = await fetch('/api/pincode-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: inputPin }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setError(true);
        setMessage(
          'Rate limit exceeded. Please try again later. If the issue persists, contact support.'
        );
        return;
      }

      if (res.ok && data.serviceable) {
        setPincode(inputPin);
        if (typeof window !== 'undefined') {
          localStorage.setItem('serviceablePin', inputPin);
        }
        setMessage(data.message || 'Serviceable');
      } else {
        setMessage(data.message || 'Not deliverable to this location');
      }
    } catch (err) {
      setError(true);
      setMessage('Error checking serviceability. Please try again later.');
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-base underline text-gray-700"
      >
        Check Delivery &amp; Services {open ? '-' : '+'}
      </button>
      <div
        className={`overflow-hidden transition-all ease-in duration-300 ${
          open ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <input
            type="text"
            value={inputPin}
            onChange={(e) => setInputPin(e.target.value)}
            placeholder="Enter pincode"
            className="border rounded px-3 py-2 text-sm flex-1"
          />
          <button
            type="submit"
            className="px-3 py-2 text-sm bg-gray-800 text-white rounded"
          >
            Check
          </button>
        </form>
        {message && (
          <div className="mt-2 text-sm">
            <p
              className={
                message.includes('Serviceable') || message.startsWith('Deliverable')
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {message}
            </p>
            {error && (
              <a
                href="mailto:support@artiva.in"
                className="underline text-gray-700 block mt-1"
              >
                Notify Admin
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
