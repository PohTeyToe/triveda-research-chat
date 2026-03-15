import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { RESEARCH_DOCS } from './research-context.js';

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
    // Build conversation as a single prompt string for the SDK
    const capped = rawMessages.slice(-MAX_HISTORY);
    const conversationPrompt = capped
      .map((m: { role: string; content: string }) =>
        m.role === 'user' ? `User: ${m.content}` : `Assistant: ${m.content}`,
      )
      .join('\n\n');

    const q = query({
      prompt: conversationPrompt,
      options: {
        model: 'sonnet',
        maxTurns: 1,
        systemPrompt: SYSTEM_PROMPT,
        allowedTools: [],
      },
    });

    let reply = '';
    for await (const msg of q) {
      if (msg.type === 'assistant' && msg.message?.content) {
        for (const block of msg.message.content) {
          if (block.type === 'text') {
            reply += block.text;
          }
        }
      }
    }

    return res.status(200).json({ reply });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Claude SDK error:', errorMessage);

    if (errorMessage.includes('rate_limit')) {
      return res.status(429).json({ error: 'Rate limited — please wait a moment and try again.' });
    }

    return res.status(500).json({ error: 'Failed to get response from Claude', detail: errorMessage });
  }
}
