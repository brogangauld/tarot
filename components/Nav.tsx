'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const linkStyle = (path: string): React.CSSProperties => ({
    textDecoration: 'none',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontFamily: 'Georgia, serif',
    padding: '0.5rem 1.25rem',
    borderRadius: 4,
    border: '1px solid #c8a96e',
    color: pathname === path ? '#fdf6e3' : '#8b6914',
    background: pathname === path ? '#8b6914' : 'transparent',
    transition: 'all 0.2s ease',
  })

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      padding: '1.5rem 0',
      borderBottom: '1px solid #e0d0b0',
      marginBottom: '2rem',
    }}>
      <Link href="/" style={linkStyle('/')}>🃏 Tarot</Link>
      <Link href="/horoscope" style={linkStyle('/horoscope')}>✦ Horoscope</Link>
    </nav>
  )
}