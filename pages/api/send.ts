import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const AGENT_URL = process.env.AGENT_URL;
  if (!AGENT_URL) return res.status(500).json({ error: 'Missing AGENT_URL' });

  const userMessage = req.body.message;

  try {
    const response = await fetch(AGENT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    res.status(200).json({ response: data.text || data.message || 'Sin respuesta del agente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al contactar el agente' });
  }
}