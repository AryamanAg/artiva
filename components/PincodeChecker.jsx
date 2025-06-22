import { useState, useContext, useEffect } from 'react';
import { LocationContext } from '@/context/LocationContext';

export default function PincodeChecker({ className = '' }) {
  const { pincode, setPincode } = useContext(LocationContext);
  const [inputPin, setInputPin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setInputPin(pincode || '');
  }, [pincode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPin) return;
    setPincode(inputPin);
    setMessage(`Pincode ${inputPin} is serviceable. Estimated delivery in 3–5 days.`);
  };

  return (
    <div className={`mt-4 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={inputPin}
          onChange={(e) => setInputPin(e.target.value)}
          placeholder="Enter pincode"
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <button
          type="submit"
          className="px-3 py-2 text-sm bg-gray-800 text-white rounded w-full"
        >
          Check Delivery
        </button>
      </form>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </div>
  );
}
