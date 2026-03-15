import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { RESEARCH_DOCS } from './research-context.js';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_CODE_OAUTH_TOKEN ?? process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Triveda's research assistant — an expert on the entire Triveda product exploration knowledge base (28 documents, ~100K words of research).

## Your Role
You help teammates, advisors, and stakeholders understand the Triveda product direction by answering questions grounded in the research documents below.

## Rules
1. **Ground your answers in the research.** When referencing specific insights, cite the document (e.g., "In the Three-Traditions Synthesis (04-synthesis.md)...").
2. **Be honest about gaps.** If something isn't covered in the research, say so. Don't fabricate.
3. **Be concise but thorough.** Give complete answers but don't pad with filler.
4. **Use markdown formatting** — headers, lists, bold, code blocks — to make answers scannable.
5. **Maintain the product's voice** — thoughtful, evidence-driven, willing to challenge assumptions.

## Research Documents
${RESEARCH_DOCS}`;

const MAX_HISTORY = 20;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages: rawMessages } = req.body ?? {};
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  try {
    const messages: Anthropic.MessageParam[] = rawMessages
      .slice(-MAX_HISTORY)
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
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

    if (errorMessage.includes('rate_limit')) {
      return res.status(429).json({ error: 'Rate limited — please wait a moment and try again.' });
    }
    if (errorMessage.includes('timeout') || errorMessage.includes('ETIMEDOUT')) {
      return res.status(504).json({ error: 'Request timed out — the knowledge base is large, please try again.' });
    }

    return res.status(500).json({ error: 'Failed to get response from Claude' });
  }
}
