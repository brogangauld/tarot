import { DrawnCard, ReadingRequest, ZodiacSign } from './types'

// ── System prompt ─────────────────────────────────────────────────────────────

export const TAROT_SYSTEM_PROMPT = `You are an insightful and empathetic tarot reader with deep knowledge of symbolism, archetypes, and the human experience. 

Your readings are:
- Warm but not saccharine
- Specific to the cards drawn, not generic
- Narrative — you weave the cards together into a story rather than reading each in isolation
- Grounded — you acknowledge uncertainty and frame insights as possibilities, not predictions
- Concise — 3–5 paragraphs, not an essay

Never say things like "the cards suggest you will..." — instead say "this may point to..." or "you might consider...". 
Avoid generic phrases like "exciting journey ahead" or "the universe has a plan".`

export const HOROSCOPE_SYSTEM_PROMPT = `You are an astrologer with a contemporary, psychologically-informed perspective.

Your horoscopes are:
- Specific to the sign's current themes, not just personality traits
- Actionable — give the reader something to reflect on or do
- Grounded in archetypal meaning, not fortune-telling
- 2–3 paragraphs

Avoid clichés. Avoid telling people what will happen. Frame everything as energy, invitation, or reflection.`

// ── User prompt builders ──────────────────────────────────────────────────────

export function buildReadingPrompt(request: ReadingRequest): string {
  const { cards, question, spreadType } = request

  const cardDescriptions = cards
    .map(({ card, isReversed, position }) => {
      return `- ${position.toUpperCase()}: ${card.name}${isReversed ? ' (Reversed)' : ''}
  Keywords: ${card.keywords.join(', ')}
  Meaning: ${isReversed ? card.reversed : card.upright}`
    })
    .join('\n')

  const questionLine = question
    ? `The querent's question: "${question}"\n\n`
    : 'No specific question was asked — offer a general reading.\n\n'

  return `${questionLine}Spread: ${spreadType}

Cards drawn:
${cardDescriptions}

Please give a cohesive reading that connects these cards and speaks to ${question ? 'the question' : 'the querent\'s current situation'}.`
}

export function buildHoroscopePrompt(sign: ZodiacSign, period: 'daily' | 'weekly' | 'monthly'): string {
  return `Please write a ${period} horoscope for ${sign.charAt(0).toUpperCase() + sign.slice(1)}.`
}
