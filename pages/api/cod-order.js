import { saveOrder } from '@/lib/orders';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderData } = req.body || {};
  if (!orderData) {
    return res.status(400).json({ message: 'Missing order data' });
  }

  try {
    await saveOrder({
      ...orderData,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending',
      codConfirmed: true,
      createdAt: new Date().toISOString(),
      orderStatus: 'Processing',
      shippingDetails: null,
    });
    console.log('COD order saved');
    return res.status(200).json({ message: 'Order saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save order' });
  }
}
