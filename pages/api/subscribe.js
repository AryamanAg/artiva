import { db } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body || {};
  const isValidEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  const sanitized = email.toLowerCase().trim();
  try {
    const ref = db.collection('Marketing_Newsletter_Subscribers').doc(sanitized);
    const doc = await ref.get();
    if (doc.exists) {
      return res.status(200).json({ message: 'Already subscribed' });
    }
    await ref.set({ email: sanitized, subscribedAt: new Date().toISOString() });
    return res.status(200).json({ message: 'Subscribed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
