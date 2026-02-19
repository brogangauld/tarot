'use client'

import { useEffect, useState } from 'react'
import { drawCards } from '@/lib/tarot'
import { DrawnCard, ZodiacSign } from '@/lib/types'
import { useReading } from '@/hooks/useReading'
import CardSpread from '@/components/CardSpread'

// Positions for a 3-card spread
const POSITIONS = ['past', 'present', 'future'] as const

export default function TarotPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [question, setQuestion] = useState('')
  const { reading, isLoading, error, getReading, reset } = useReading()
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | undefined>(undefined)

  function handleDraw() {
    reset()
    const cards = drawCards(3).map((c, i) => ({
      ...c,
      position: POSITIONS[i],
    }))
    setDrawnCards(cards)
  }

  async function handleGetReading() {
    await getReading(drawnCards, question || undefined, zodiacSign)
  }

  function handleReset() {
    setDrawnCards([])
    setQuestion('')
    reset()
  }

  function handleSignSelect(sign: ZodiacSign) {
    setZodiacSign(sign)
    localStorage.setItem('tarot-sign', sign)
    reset()
  }

  // Load saved sign from localStorage (same one horoscope saves):
  useEffect(() => {
    const saved = localStorage.getItem('tarot-sign') as ZodiacSign | null
    if (saved) setZodiacSign(saved)
  }, [])

  return (
    // Page wrapper
    <main style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: "0 2rem 4rem",
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

      <div>
        <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9d8fa0', fontFamily: 'Georgia, serif' }}>
          Your sign <span style={{ color: '#c8a96e' }}>(optional)</span>
        </label>
        <br />
        <select
          value={zodiacSign ?? ''}
          onChange={e => handleSignSelect(e.target.value as ZodiacSign || undefined)}
          style={{
            marginTop: '0.5rem',
            padding: '0.6rem 1rem',
            background: '#fff8ec',
            border: '1px solid #c8a96e',
            borderRadius: 6,
            fontSize: "1rem",
            color: "#3a2e1e",
            fontFamily: "Georgia, serif",
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <option value=''>Select a sign...</option>
          <option value='aries'>♈ Aries</option>
          <option value='taurus'>♉ Taurus</option>
          <option value='gemini'>♊ Gemini</option>
          <option value='cancer'>♋ Cancer</option>
          <option value='leo'>♌ Leo</option>
          <option value='virgo'>♍ Virgo</option>
          <option value='libra'>♎ Libra</option>
          <option value='scorpio'>♏ Scorpio</option>
          <option value='sagittarius'>♐ Sagittarius</option>
          <option value='capricorn'>♑ Capricorn</option>
          <option value='aquarius'>♒ Aquarius</option>
          <option value='pisces'>♓ Pisces</option>
        </select>
      </div>

      <br/>

      {/* Question input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleDraw()
        }}
      >
        <div>
          <div style={{ margin: "0 0 0.2rem 0.25rem" }}>
            <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9d8fa0', fontFamily: 'Georgia, serif' }}>
              Set an intention for your reading <span style={{ color: '#c8a96e' }}>(optional)</span>
            </label>
            <br />
          </div>
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
      </form>
      {/* Draw button */}
      {!drawnCards.length && (
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
      )}

      <div style={{
        marginTop: "2rem",
        transition: "opacity 0.4s ease",
        opacity: drawnCards.length ? 1 : 0,
      }}>
        <CardSpread cards={drawnCards} />
      </div>

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
          {isLoading ? 'Reading the cards...' : 'Reveal my reading'}
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
