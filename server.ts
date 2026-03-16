import { createServer, IncomingMessage } from 'http';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { RESEARCH_DOCS } from './api/research-context.js';

const SYSTEM_PROMPT = `You are Triveda's research assistant — an expert on the Triveda product exploration knowledge base (consolidated from 28 documents into a structured reference).

## Your Role
You help teammates, advisors, and stakeholders understand the Triveda product direction by answering questions grounded in the research documents below.

## Rules
1. **Be concise.** Keep answers under 150 words by default. Use short paragraphs, bullets, and bold for key terms. Only go longer if the question genuinely requires depth — and even then, stay under 300 words.
2. **Ground your answers in the research.** Cite the relevant Part/section when referencing specific insights.
3. **Be honest about gaps.** If something isn't covered in the research, say so. Don't fabricate.
4. **Use markdown formatting** — headers, lists, bold — to make answers scannable. Don't over-format with tables unless the data truly needs one.
5. **Maintain the product's voice** — thoughtful, evidence-driven, willing to challenge assumptions.

## Research Documents
${RESEARCH_DOCS}`;

const MAX_HISTORY = 20;
const PORT = parseInt(process.env.PORT || '3001', 10);

const ALLOWED_ORIGINS = [
  'https://triveda-research-chat.vercel.app',
  'http://localhost:5191',
];

function setCors(res: import('http').ServerResponse, origin: string | undefined) {
  const allowed = origin && ALLOWED_ORIGINS.some((o) => origin.startsWith(o));
  res.setHeader('Access-Control-Allow-Origin', allowed ? origin! : ALLOWED_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  setCors(res, origin);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const body = JSON.parse(await readBody(req));
    const rawMessages: Array<{ role: string; content: string }> = body.messages;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing messages array' }));
      return;
    }

    const capped = rawMessages.slice(-MAX_HISTORY);
    const conversationPrompt = capped
      .map((m) => (m.role === 'user' ? `User: ${m.content}` : `Assistant: ${m.content}`))
      .join('\n\n');

    const q = query({
      prompt: conversationPrompt,
      options: {
        model: 'opus',
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

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ reply }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error:', errorMessage);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to get response', detail: errorMessage }));
  }
});

server.listen(PORT, () => {
  console.log(`Triveda Research Chat API listening on :${PORT}`);
});
