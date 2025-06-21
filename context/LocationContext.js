import { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPin = localStorage.getItem('userPincode');
      if (storedPin) {
        setPincode(storedPin);
      }
      const storedAddr = localStorage.getItem('userAddress');
      if (storedAddr) {
        try {
          setAddress(JSON.parse(storedAddr));
        } catch (err) {
          console.error('Failed to parse address', err);
        }
      }
    }
  }, []);

  // Persist pincode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (pincode) {
        localStorage.setItem('userPincode', pincode);
      } else {
        localStorage.removeItem('userPincode');
      }
    }
  }, [pincode]);

  // Persist address
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (address) {
        localStorage.setItem('userAddress', JSON.stringify(address));
      } else {
        localStorage.removeItem('userAddress');
      }
    }
  }, [address]);

  return (
    <LocationContext.Provider
      value={{ pincode, setPincode, address, setAddress }}
    >
      {children}
    </LocationContext.Provider>
  );
}
