export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { pincode } = req.body || {};
  const valid = typeof pincode === 'string' && /^\d{6}$/.test(pincode);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid pincode' });
  }

  const pickup = '110030';
  const url = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickup}&delivery_postcode=${pincode}&cod=0&weight=0.5`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer <YOUR_SHIPROCKET_TOKEN>',
      },
    });

    if (response.status === 429) {
      return res.status(429).json({
        serviceable: false,
        message: 'Rate limit exceeded',
      });
    }

    if (!response.ok) {
      throw new Error(`Shiprocket API error: ${response.status}`);
    }

    const data = await response.json();
    const companies = data?.data?.available_courier_companies;

    if (Array.isArray(companies) && companies.length > 0) {
      const etd = companies[0]?.etd || '';
      const match = etd.match(/\d+/);
      const days = match ? parseInt(match[0], 10) : null;
      return res.status(200).json({
        serviceable: true,
        estimated_delivery_days: days,
        message: days ? `Deliverable in ${etd} days` : 'Serviceable',
      });
    }

    return res.status(200).json({
      serviceable: false,
      message: 'Not deliverable to this location',
    });
  } catch (err) {
    console.error('Pincode check failed', err);
    return res.status(500).json({
      serviceable: false,
      message: 'Error checking serviceability',
    });
  }
}
