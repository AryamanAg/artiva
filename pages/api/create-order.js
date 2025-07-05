export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount } = req.body || {};
  if (typeof amount !== 'number') {
    return res.status(400).json({ message: 'Amount required' });
  }

  try {
    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Math.round(amount * 100), currency: 'INR' }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Razorpay error:', errorText);
      return res.status(500).json({ message: 'Razorpay order creation failed' });
    }
    return res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
