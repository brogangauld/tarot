import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { ReadingRequest } from '@/lib/types'
import { buildReadingPrompt, TAROT_SYSTEM_PROMPT } from '@/lib/prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // set this in .env.local
})

export async function POST(req: NextRequest) {
  const body: ReadingRequest = await req.json()

  // Basic validation
  if (!body.cards || body.cards.length === 0) {
    return new Response('No cards provided', { status: 400 })
  }

  const prompt = buildReadingPrompt(body)

  // Stream the response back to the client
  const stream = anthropic.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: TAROT_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  // Convert Anthropic's stream to a standard ReadableStream
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
