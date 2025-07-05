import crypto from 'crypto';
import { saveOrder } from '@/lib/orders';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId, paymentId, signature, orderData } = req.body || {};
  if (!orderId || !paymentId || !signature || !orderData) {
    return res.status(400).json({ message: 'Missing params' });
  }

  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  const paymentStatus = expected === signature ? 'Success' : 'Failed';

  try {
    await saveOrder({
      ...orderData,
      paymentMethod: 'Razorpay',
      paymentStatus,
      razorpayDetails: { orderId, paymentId, signature },
      createdAt: new Date().toISOString(),
      orderStatus: 'Processing',
      shippingDetails: null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save order' });
  }

  if (paymentStatus === 'Success') {
    return res.status(200).json({ message: 'Verified' });
  }
  return res.status(400).json({ message: 'Invalid signature' });
}
