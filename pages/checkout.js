import { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/context/CartContext';
import { LocationContext } from '@/context/LocationContext';
import Navbar from '@/components/Navbar';

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const { address: savedAddress, pincode: savedPin, setAddress, setPincode } =
    useContext(LocationContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'cod',
  });

  useEffect(() => {
    if (savedAddress || savedPin) {
      setForm((prev) => ({
        ...prev,
        name: savedAddress?.name || prev.name,
        phone: savedAddress?.phone || prev.phone,
        address: savedAddress?.street || prev.address,
        city: savedAddress?.city || prev.city,
        pincode: savedAddress?.pincode || savedPin || prev.pincode,
      }));
    }
    // we only want to run this when the saved values change
  }, [savedAddress, savedPin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // persist the address so future visits can be pre-filled
    setAddress({
      name: form.name,
      street: form.address,
      city: form.city,
      phone: form.phone,
      pincode: form.pincode,
    });
    setPincode(form.pincode);
    if (form.payment === 'razorpay') {
      alert('💳 Razorpay would trigger here.');
    } else {
      alert('✅ Order placed with Cash on Delivery.');
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'phone', 'address', 'city', 'pincode'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          ))}

          <div className="pt-4">
            <label className="font-semibold block mb-2">Payment Method:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === 'cod'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={form.payment === 'razorpay'}
                  onChange={handleChange}
                />
                Razorpay
              </label>
            </div>
          </div>

          <div className="pt-4 text-right">
            <p className="text-lg font-semibold mb-2">Total: ₹{total}</p>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-300 transition"
            >
              Place Order →
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
