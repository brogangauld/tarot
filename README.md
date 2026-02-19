# tarot
a tarot card generator with connection to Claude Anthropic LLM API to give readings and horoscopes

# 🔮 Tarot App

A tarot reading + horoscope app powered by Claude (Anthropic).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Anthropic SDK** (streaming responses)
- **Vercel** (deployment)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your API key

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Anthropic API key.
Get one at https://console.anthropic.com

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at vercel.com
3. Add `ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy — that's it

## Customising

### Change the model
In `app/api/reading/route.ts` and `app/api/horoscope/route.ts`, swap the model string:
- `claude-haiku-4-5-20251001` — cheapest, fastest
- `claude-opus-4-6` — smartest, slower

### Change the tone
Edit the system prompts in `lib/prompts.ts`.

### Add card art
In `app/page.tsx`, replace the 🃏 placeholder with your card component.
You have `card.id`, `card.name`, `card.arcana`, `card.suit`, and `isReversed` available.

### Fill in minor arcana meanings
In `lib/tarot.ts`, the minor arcana 2–10 have placeholder meanings.
A good free dataset: https://github.com/dariusk/corpora/blob/master/data/divination/tarot_interpretations.json

### Add more spreads
In `lib/types.ts`, add to the `SpreadType` union.
Update `buildReadingPrompt()` in `lib/prompts.ts` to describe the new spread to Claude.

## Rate Limiting

For a production app, add rate limiting to the API routes to avoid runaway costs.
A simple option: `npm install @upstash/ratelimit @upstash/redis`


------------

Use: Value
Page background: #fdf6e3
Surface / input: #fff8ec
Card art: #e8d5a3
Border / accent: #c8a96e
Primary button: #8b6914
Body text: #3a2e1e
Muted text: #9d8fa0