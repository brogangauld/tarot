import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { ZodiacSign } from '@/lib/types'
import { buildHoroscopePrompt, HOROSCOPE_SYSTEM_PROMPT } from '@/lib/prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  const { sign, period = 'daily' }: { sign: ZodiacSign; period: 'daily' | 'weekly' | 'monthly' } =
    await req.json()

  if (!sign) {
    return new Response('No sign provided', { status: 400 })
  }

  const prompt = buildHoroscopePrompt(sign, period)

  const stream = anthropic.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: HOROSCOPE_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

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
