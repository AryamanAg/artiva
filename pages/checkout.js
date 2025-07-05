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
    email: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = {
      name: form.name,
      street: form.address,
      city: form.city,
      phone: form.phone,
      pincode: form.pincode,
    };

    // persist address & pin locally
    setAddress(address);
    setPincode(form.pincode);

    const items = cart.map((item) => ({
      id: item.id,
      size: item.size,
      color: item.color,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderData = {
      userEmail: form.email,
      items,
      deliveryAddress: address,
      totalAmount: total,
    };

    if (form.payment === 'razorpay') {
      try {
        const resp = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total }),
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error('Failed to create order');

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          order_id: data.orderId,
          handler: async (response) => {
            const verify = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderData,
              }),
            });
            if (verify.ok) {
              alert('Order placed successfully');
            } else {
              alert('Payment verification failed');
            }
          },
        };

        const rz = new window.Razorpay(options);
        rz.open();
      } catch (err) {
        console.error(err);
        alert('Payment initiation failed');
      }
    } else {
      try {
        const resp = await fetch('/api/cod-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderData }),
        });
        if (resp.ok) {
          alert("Order placed. You'll pay on delivery.");
        } else {
          alert('Failed to place order');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to place order');
      }
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'phone', 'address', 'city', 'pincode'].map((field) => (
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
