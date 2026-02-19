'use client'

import { useState, useEffect } from 'react'
import { useHoroscope } from '@/hooks/useReading'
import { ZodiacSign } from '@/lib/types'

const SIGNS: { sign: ZodiacSign; symbol: string; dates: string }[] = [
  { sign: 'aries',       symbol: '♈', dates: 'Mar 21 – Apr 19' },
  { sign: 'taurus',      symbol: '♉', dates: 'Apr 20 – May 20' },
  { sign: 'gemini',      symbol: '♊', dates: 'May 21 – Jun 20' },
  { sign: 'cancer',      symbol: '♋', dates: 'Jun 21 – Jul 22' },
  { sign: 'leo',         symbol: '♌', dates: 'Jul 23 – Aug 22' },
  { sign: 'virgo',       symbol: '♍', dates: 'Aug 23 – Sep 22' },
  { sign: 'libra',       symbol: '♎', dates: 'Sep 23 – Oct 22' },
  { sign: 'scorpio',     symbol: '♏', dates: 'Oct 23 – Nov 21' },
  { sign: 'sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21' },
  { sign: 'capricorn',   symbol: '♑', dates: 'Dec 22 – Jan 19' },
  { sign: 'aquarius',    symbol: '♒', dates: 'Jan 20 – Feb 18' },
  { sign: 'pisces',      symbol: '♓', dates: 'Feb 19 – Mar 20' },
]

type Period = 'daily' | 'weekly' | 'monthly'

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null)
  const [period, setPeriod] = useState<Period>('daily')
  const { horoscope, isLoading, error, getHoroscope, reset } = useHoroscope()

  // Remember their sign across visits
  useEffect(() => {
    const saved = localStorage.getItem('tarot-sign') as ZodiacSign | null
    if (saved) setSelectedSign(saved)
  }, [])

  function handleSignSelect(sign: ZodiacSign) {
    setSelectedSign(sign)
    localStorage.setItem('tarot-sign', sign)
    reset()
  }

  async function handleGetHoroscope() {
    if (!selectedSign) return
    await getHoroscope(selectedSign, period)
  }

  const selectedData = SIGNS.find(s => s.sign === selectedSign)

  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 2rem 4rem' }}>

      <h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.8rem', color: '#3a2e1e', marginBottom: '0.25rem' }}>
        Your Horoscope
      </h1>
      <p style={{ textAlign: 'center', color: '#9d8fa0', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
        Select your sign
      </p>

      {/* Sign grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        {SIGNS.map(({ sign, symbol, dates }) => (
          <button
            key={sign}
            onClick={() => handleSignSelect(sign)}
            style={{
              background: selectedSign === sign ? '#8b6914' : '#fff8ec',
              border: `1px solid ${selectedSign === sign ? '#8b6914' : '#c8a96e'}`,
              borderRadius: 8,
              padding: '0.75rem 0.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{symbol}</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', color: selectedSign === sign ? '#fdf6e3' : '#8b6914' }}>
              {sign}
            </div>
            <div style={{ fontSize: '0.55rem', color: selectedSign === sign ? '#e8d5a3' : '#9d8fa0', marginTop: '0.2rem' }}>
              {dates}
            </div>
          </button>
        ))}
      </div>

      {/* Period toggle */}
      {selectedSign && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['daily', 'weekly', 'monthly'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => { setPeriod(p); reset() }}
              style={{
                background: period === p ? '#8b6914' : 'transparent',
                border: '1px solid #c8a96e',
                borderRadius: 4,
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
                color: period === p ? '#fdf6e3' : '#8b6914',
                transition: 'all 0.2s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Get reading button */}
      {selectedSign && !horoscope && (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={handleGetHoroscope}
            disabled={isLoading}
            style={{
              background: '#8b6914',
              color: '#fdf6e3',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: 6,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'wait' : 'pointer',
              fontFamily: 'Georgia, serif',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading
              ? `Reading the stars${['.', '..', '...'][Math.floor(Date.now() / 500) % 3]}`
              : `Get ${period} reading`}
          </button>
        </div>
      )}

      {/* Error */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Horoscope output */}
      {(horoscope || isLoading) && (
        <div style={{
          background: '#fff8ec',
          border: '1px solid #c8a96e',
          borderRadius: 8,
          padding: '1.5rem 2rem',
          lineHeight: 1.8,
          fontSize: '1rem',
          color: '#3a2e1e',
          fontFamily: 'Georgia, serif',
          whiteSpace: 'pre-wrap',
        }}>
          {selectedData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #e0d0b0' }}>
              <span style={{ fontSize: '2rem' }}>{selectedData.symbol}</span>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8b6914', fontFamily: 'Georgia, serif' }}>
                  {selectedData.sign} · {period}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#9d8fa0' }}>{selectedData.dates}</div>
              </div>
            </div>
          )}
          {horoscope}
          {isLoading && <span style={{ opacity: 0.4 }}>▌</span>}
        </div>
      )}

      {/* Start over */}
      {horoscope && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={reset}
            style={{
              background: 'transparent',
              color: '#8b6914',
              border: '1px solid #c8a96e',
              padding: '0.6rem 1.5rem',
              borderRadius: 6,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            New Reading
          </button>
        </div>
      )}
    </main>
  )
}