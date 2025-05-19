import { Low, JSONFile } from 'lowdb';
import { join } from 'path';

const file = join(process.cwd(), 'data', 'colors.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

export default async function handler(req, res) {
  // Basit token kontrolü
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (req.method === 'POST') {
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, color } = req.body;
    if (!id || !color || typeof color !== 'string' || typeof id !== 'string') {
      return res.status(400).json({ error: 'Eksik veya geçersiz id ya da color' });
    }

    await db.read();
    db.data = db.data || {};
    db.data[id] = color;
    await db.write();

    return res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    await db.read();
    db.data = db.data || {};
    return res.status(200).json(db.data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
