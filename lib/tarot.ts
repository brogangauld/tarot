import { TarotCard } from './types'

// ── Major Arcana (all 22) ─────────────────────────────────────────────────────

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    arcana: 'major',
    suit: null,
    number: 0,
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    upright: 'New beginnings, optimism, trust in life',
    reversed: 'Recklessness, risk-taking, inconsideration',
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    arcana: 'major',
    suit: null,
    number: 1,
    keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    upright: 'Willpower, desire, creation, manifestation',
    reversed: 'Trickery, illusions, out of touch',
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    arcana: 'major',
    suit: null,
    number: 2,
    keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
    upright: 'Intuition, higher powers, mystery, subconscious mind',
    reversed: 'Secrets, disconnected from intuition, withdrawal',
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    arcana: 'major',
    suit: null,
    number: 3,
    keywords: ['femininity', 'beauty', 'nature', 'abundance'],
    upright: 'Femininity, beauty, nature, nurturing, abundance',
    reversed: 'Creative block, dependence on others',
  },
  {
    id: 'the-emperor',
    name: 'The Emperor',
    arcana: 'major',
    suit: null,
    number: 4,
    keywords: ['authority', 'structure', 'control', 'fatherhood'],
    upright: 'Authority, establishment, structure, fatherhood',
    reversed: 'Domination, excessive control, rigidity',
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    arcana: 'major',
    suit: null,
    number: 5,
    keywords: ['tradition', 'conformity', 'morality', 'ethics'],
    upright: 'Tradition, conformity, morality, institutions',
    reversed: 'Rebellion, subversiveness, new approaches',
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    arcana: 'major',
    suit: null,
    number: 6,
    keywords: ['love', 'harmony', 'relationships', 'values alignment'],
    upright: 'Love, harmony, relationships, alignment of values',
    reversed: 'Self-love deficit, disharmony, misalignment',
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    arcana: 'major',
    suit: null,
    number: 7,
    keywords: ['control', 'willpower', 'victory', 'assertion'],
    upright: 'Control, willpower, success, action, determination',
    reversed: 'Lack of control, lack of direction, aggression',
  },
  {
    id: 'strength',
    name: 'Strength',
    arcana: 'major',
    suit: null,
    number: 8,
    keywords: ['strength', 'courage', 'patience', 'inner power'],
    upright: 'Inner strength, bravery, compassion, focus',
    reversed: 'Self doubt, weakness, insecurity',
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    arcana: 'major',
    suit: null,
    number: 9,
    keywords: ['soul searching', 'introspection', 'solitude', 'inner guidance'],
    upright: 'Solitude, rest, introspection, inner searching',
    reversed: 'Isolation, loneliness, withdrawal',
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    arcana: 'major',
    suit: null,
    number: 10,
    keywords: ['good luck', 'karma', 'life cycles', 'destiny'],
    upright: 'Good luck, karma, life cycles, destiny, a turning point',
    reversed: 'Bad luck, resistance to change, breaking cycles',
  },
  {
    id: 'justice',
    name: 'Justice',
    arcana: 'major',
    suit: null,
    number: 11,
    keywords: ['justice', 'fairness', 'truth', 'cause and effect'],
    upright: 'Justice, fairness, truth, cause and effect',
    reversed: 'Unfairness, lack of accountability, dishonesty',
  },
  {
    id: 'the-hanged-man',
    name: 'The Hanged Man',
    arcana: 'major',
    suit: null,
    number: 12,
    keywords: ['suspension', 'restriction', 'letting go', 'sacrifice'],
    upright: 'Pause, surrender, letting go, new perspectives',
    reversed: 'Delays, resistance, stalling, indecision',
  },
  {
    id: 'death',
    name: 'Death',
    arcana: 'major',
    suit: null,
    number: 13,
    keywords: ['endings', 'change', 'transformation', 'transition'],
    upright: 'Endings, change, transformation, transition',
    reversed: 'Resistance to change, personal transformation, inner purging',
  },
  {
    id: 'temperance',
    name: 'Temperance',
    arcana: 'major',
    suit: null,
    number: 14,
    keywords: ['balance', 'moderation', 'patience', 'purpose'],
    upright: 'Balance, moderation, patience, purpose',
    reversed: 'Imbalance, excess, self-healing needed',
  },
  {
    id: 'the-devil',
    name: 'The Devil',
    arcana: 'major',
    suit: null,
    number: 15,
    keywords: ['shadow self', 'attachment', 'addiction', 'restriction'],
    upright: 'Shadow self, addiction, restriction, sexuality',
    reversed: 'Releasing limiting beliefs, exploring dark thoughts',
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    arcana: 'major',
    suit: null,
    number: 16,
    keywords: ['sudden change', 'upheaval', 'chaos', 'revelation'],
    upright: 'Sudden change, upheaval, chaos, revelation, awakening',
    reversed: 'Personal transformation, fear of change, averting disaster',
  },
  {
    id: 'the-star',
    name: 'The Star',
    arcana: 'major',
    suit: null,
    number: 17,
    keywords: ['hope', 'faith', 'purpose', 'renewal'],
    upright: 'Hope, faith, purpose, renewal, spirituality',
    reversed: 'Lack of faith, despair, self-trust issues',
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    arcana: 'major',
    suit: null,
    number: 18,
    keywords: ['illusion', 'fear', 'unconscious', 'intuition'],
    upright: 'Illusion, fear, the unconscious, intuition',
    reversed: 'Release of fear, repressed emotion, inner confusion',
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    arcana: 'major',
    suit: null,
    number: 19,
    keywords: ['positivity', 'fun', 'warmth', 'success'],
    upright: 'Positivity, fun, warmth, success, vitality',
    reversed: 'Inner child, feeling down, overly optimistic',
  },
  {
    id: 'judgement',
    name: 'Judgement',
    arcana: 'major',
    suit: null,
    number: 20,
    keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'],
    upright: 'Judgement, rebirth, inner calling, absolution',
    reversed: 'Self-doubt, refusal of self-examination',
  },
  {
    id: 'the-world',
    name: 'The World',
    arcana: 'major',
    suit: null,
    number: 21,
    keywords: ['completion', 'integration', 'accomplishment', 'travel'],
    upright: 'Completion, integration, accomplishment, travel',
    reversed: 'Seeking closure, incomplete goals, short-cuts',
  },
]

// ── Minor Arcana helper ───────────────────────────────────────────────────────
// Generates the 14 cards for a given suit (Ace through King)

type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

const COURT_CARDS = ['Page', 'Knight', 'Queen', 'King']
const SUIT_KEYWORDS: Record<Suit, string[]> = {
  wands:     ['fire', 'passion', 'energy', 'creativity'],
  cups:      ['water', 'emotion', 'relationships', 'intuition'],
  swords:    ['air', 'intellect', 'conflict', 'truth'],
  pentacles: ['earth', 'material', 'practical', 'financial'],
}

function buildMinorSuit(suit: Suit): TarotCard[] {
  const cards: TarotCard[] = []

  // Ace
  cards.push({
    id: `ace-of-${suit}`,
    name: `Ace of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: 'minor',
    suit,
    number: 1,
    keywords: ['beginnings', 'potential', ...SUIT_KEYWORDS[suit].slice(0, 2)],
    upright: `New beginnings in the realm of ${suit}`,
    reversed: `Blocked ${suit} energy, missed opportunity`,
  })

  // 2–10
  for (let n = 2; n <= 10; n++) {
    cards.push({
      id: `${n}-of-${suit}`,
      name: `${n} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      arcana: 'minor',
      suit,
      number: n,
      keywords: SUIT_KEYWORDS[suit],
      upright: `Upright meaning for ${n} of ${suit}`,
      reversed: `Reversed meaning for ${n} of ${suit}`,
    })
  }

  // Court cards (11–14)
  COURT_CARDS.forEach((title, i) => {
    cards.push({
      id: `${title.toLowerCase()}-of-${suit}`,
      name: `${title} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      arcana: 'minor',
      suit,
      number: 11 + i,
      keywords: SUIT_KEYWORDS[suit],
      upright: `${title} energy in ${suit}`,
      reversed: `${title} energy blocked or inverted`,
    })
  })

  return cards
}

// 💡 Fill in the upright/reversed for 2–10 with real meanings as you go.
// There are good free datasets: https://github.com/dariusk/corpora/blob/master/data/divination/tarot_interpretations.json

export const MINOR_ARCANA: TarotCard[] = [
  ...buildMinorSuit('wands'),
  ...buildMinorSuit('cups'),
  ...buildMinorSuit('swords'),
  ...buildMinorSuit('pentacles'),
]

export const FULL_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA]

// ── Utility ──────────────────────────────────────────────────────────────────

/** Draw n unique cards at random, each potentially reversed */
export function drawCards(count: number, deck = FULL_DECK) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((card) => ({
  card,
  isReversed: Math.random() > 0.5,
  id: card.id,
  name: card.name,
}))
}
