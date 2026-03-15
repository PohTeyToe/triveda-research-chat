import type { VercelRequest, VercelResponse } from '@vercel/node';

// Stub — will be wired to Claude API with research docs as context
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body ?? {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  // TODO: Load research docs, call Claude API
  return res.status(200).json({
    reply: 'Research chatbot not yet connected. This is a placeholder response.',
  });
}
