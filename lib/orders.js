import { db } from './firebaseAdmin';

export async function saveOrder(order) {
  const ref = await db.collection('orders').add(order);
  return { id: ref.id };
}
