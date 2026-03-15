import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_CODE_OAUTH_TOKEN ?? process.env.ANTHROPIC_API_KEY,
});

// TODO: Replace with actual research docs content
const RESEARCH_CONTEXT = `You are a research assistant for the Triveda product exploration.
You have access to ~65,000 words of research across 28 documents covering:
- Product exploration pipeline (original 8 docs, three-traditions 7 docs, challenges 5 docs)
- The Triveda concept: a three-tradition daily food companion
- Ayurveda (food lens), TCM (energy lens), Naturopathy (honesty/evidence lens)
- Constitutional typing, daily food engine, contradiction engine
- Audience analysis, business model, build timeline
- Devil's advocate stress tests across all three audiences

Answer questions about the research, the product direction, and the reasoning behind decisions.
Be specific and cite which document or section you're drawing from when possible.
If asked about something not covered in the research, say so honestly.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body ?? {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const messages: Anthropic.MessageParam[] = [
      ...(Array.isArray(history) ? history : []),
      { role: 'user' as const, content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: RESEARCH_CONTEXT,
      messages,
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return res.status(200).json({ reply });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Claude API error:', errorMessage);
    return res.status(500).json({ error: 'Failed to get response from Claude' });
  }
}
