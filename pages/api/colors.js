import { db } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if (req.method === 'POST') {
      if (token !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id, color } = req.body;
      if (!id || !color) {
        return res.status(400).json({ error: 'Eksik bilgi' });
      }

      await db.collection('colors').doc(id).set({ color });
      return res.status(200).json({ success: true });

    } else if (req.method === 'GET') {
      const snapshot = await db.collection('colors').get();
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data().color;
      });
      return res.status(200).json(data);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API HATASI:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
