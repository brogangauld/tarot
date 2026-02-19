export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles' | null

export interface TarotCard {
  id: string
  name: string
  arcana: Arcana
  suit: Suit
  number: number
  keywords: string[]
  upright: string    // short meaning
  reversed: string   // short meaning
}

export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: 'past' | 'present' | 'future'
  id: string
  name: string
}

export interface ReadingRequest {
  cards: DrawnCard[]
  question?: string       // optional user question
  spreadType: SpreadType
  zodiacSign?: ZodiacSign // for horoscope readings
}

export type SpreadType = 'three-card' | 'single' | 'celtic-cross'

export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'
