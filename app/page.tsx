'use client'

import { useState } from 'react'
import { drawCards } from '@/lib/tarot'
import { DrawnCard } from '@/lib/types'
import { useReading } from '@/hooks/useReading'
import CardSpread from '@/components/CardSpread'

// Positions for a 3-card spread
const POSITIONS = ['past', 'present', 'future'] as const

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [question, setQuestion] = useState('')
  const { reading, isLoading, error, getReading, reset } = useReading()

  function handleDraw() {
    reset()
    const cards = drawCards(3).map((c, i) => ({
      ...c,
      position: POSITIONS[i],
    }))
    setDrawnCards(cards)
  }

  async function handleGetReading() {
    await getReading(drawnCards, question || undefined)
  }

  function handleReset() {
    setDrawnCards([])
    setQuestion('')
    reset()
  }

  return (
    // Page wrapper
    <main style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: "3rem 2rem",
    }}>

      <h1 style={{
        fontSize: "2rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#3a2e1e",
        textAlign: "center",
        marginBottom: "2rem",
      }}>
        Your Reading
      </h1>

      {/* Question input */}
      <div>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What would you like guidance on?"
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: "#fff8ec",
            border: "1px solid #c8a96e",
            borderRadius: 6,
            fontSize: "1rem",
            color: "#3a2e1e",
            fontFamily: "Georgia, serif",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Draw button */}
      <button onClick={handleDraw} style={{
        background: "#8b6914",
        color: "#fdf6e3",
        border: "none",
        padding: "0.75rem 2rem",
        marginTop: "1rem",
        marginBottom: "2rem",
        borderRadius: 6,
        fontSize: "0.8rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "Georgia, serif",
      }}>
        Draw 3 Cards
      </button>

      <CardSpread cards={drawnCards} />

      {/* Get reading button */}
      {drawnCards.length > 0 && !reading && (
        <button
          onClick={handleGetReading}
          disabled={isLoading}
          style={{
            background: "#8b6914",
            color: "#fdf6e3",
            border: "none",
            padding: "0.75rem 2rem",
            margin: "0 2rem 0 0",
            borderRadius: 6,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
          }}
        >
          {isLoading ? 'Reading the cards...' : 'Get Reading'}
        </button>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      {/* Streaming reading output */}
      {reading && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "#fff8ec",
            border: "1px solid #c8a96e",
            borderRadius: 8,
            lineHeight: 1.8,
            fontSize: "1rem",
            color: "#3a2e1e",
            whiteSpace: "pre-wrap",
          }}
        >
          {reading}
          {isLoading && <span style={{ opacity: 0.4 }}>▌</span>}
        </div>
      )}

      {/* Reset */}
      {(drawnCards.length > 0 || reading) && (
        <button onClick={handleReset} style={{
          background: "transparent",
          color: "#8b6914",
          border: "1px solid #c8a96e",
          padding: "0.75rem 2rem",
          margin: "2rem 2rem 0 0",
          borderRadius: 6,
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "Georgia, serif",
        }}>
          Start Over
        </button>
      )}
    </main>
  )
}
