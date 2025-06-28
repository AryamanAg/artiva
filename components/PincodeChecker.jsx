import { useState, useContext, useEffect } from 'react';
import { LocationContext } from '@/context/LocationContext';

export default function PincodeChecker() {
  const { pincode, setPincode } = useContext(LocationContext);
  const [inputPin, setInputPin] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInputPin(pincode || '');
  }, [pincode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPin) return;
    const valid = /^\d{6}$/.test(inputPin);
    if (valid) {
      setPincode(inputPin);
      setMessage('Serviceable');
    } else {
      setMessage('Not serviceable');
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
          <p
            className={`text-sm mt-2 ${
              message === 'Serviceable' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
