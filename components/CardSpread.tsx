import { useState, useEffect } from "react"
import { DrawnCard } from "@/lib/types"

// ─────────────────────────────────────────────────────────────
// CONFIGURATION — change these to customise timing
// ─────────────────────────────────────────────────────────────
const DEAL_STAGGER_MS = 200   // delay between each card being dealt
const FLIP_DELAY_MS = 600   // how long after deal before cards start flipping
const FLIP_STAGGER_MS = 300   // delay between each card flipping
const FLIP_SPEED = "0.6s" // CSS transition duration

// ─────────────────────────────────────────────────────────────
// CARD BACK IMAGE
// Drop your image into your project's /public folder and update
// the path below, e.g. "/card-back.jpg" or "/images/back.png"
// ─────────────────────────────────────────────────────────────
const CARD_BACK_IMAGE = "/cards/card-back.png"

// ─────────────────────────────────────────────────────────────
// TarotCard component
// ─────────────────────────────────────────────────────────────
function TarotCard({ card, dealDelay }: { card: DrawnCard, dealDelay: number }) {
    const [visible, setVisible] = useState(false)
    const [flipped, setFlipped] = useState(false)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        // 1. Card slides in
        const t1 = setTimeout(() => setVisible(true), dealDelay)
        // 2. Card flips to reveal face
        const t2 = setTimeout(() => setFlipped(true), dealDelay + FLIP_DELAY_MS)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [dealDelay])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            // Deal-in animation
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>

            {/* Position label */}
            <span style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9d8fa0",
            }}>
                {card.position}
            </span>

            {/* 3D flip container */}
            <div style={{
                width: "clamp(95px, 11vw, 140px)",  // responsive scaling
                aspectRatio: "130 / 220",           // keeps tarot proportions
                perspective: 1000,
            }}>
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        borderRadius: 10,
                        transformStyle: "preserve-3d",
                        transform: flipped
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        transition: `transform ${FLIP_SPEED} cubic-bezier(0.4, 0.2, 0.2, 1), box-shadow 0.4s ease`,
                        boxShadow: hovered
                            ? "0 8px 25px rgba(212, 175, 55, 0.35)"    // soft golden glow
                            : "0 6px 18px rgba(0,0,0,0.25)"            // subtle depth
                    }}
                >
                    {/* ── BACK FACE ───────────────────────────── */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}>
                        <img
                            src={CARD_BACK_IMAGE}
                            alt="Card back"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "#f5e8c8" }}
                        />
                    </div>

                    {/* ── FRONT FACE ──────────────────────────── */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: card.isReversed
                            ? "rotateY(180deg) rotate(180deg)"
                            : "rotateY(180deg)",
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#f5e8c8",
                        border: "2px solid #c8a96e",
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 6px",
                        gap: "6px"
                    }}>
                        {/* Card name top */}
                        <span style={{
                            fontSize: "0.55rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#8b6914",
                            fontFamily: "serif",
                            textAlign: "center",
                            flexShrink: 0
                        }}>
                            {card.name}
                        </span>

                        {/* Card art */}
                        <div style={{
                            flex: 1,
                            minHeight: 0,
                            width: "100%",
                            borderRadius: 4,
                            overflow: "hidden",
                            display: "flex",
                            padding: "6px 0"
                        }}>
                            <img
                                src={`/cards/${card.id}.png`}
                                alt={card.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block"
                                }}
                            />
                        </div>

                        {/* Card name bottom */}
                        <span style={{
                            fontSize: "0.55rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#8b6914",
                            fontFamily: "serif",
                            textAlign: "center",
                            flexShrink: 0
                        }}>
                            {card.name}
                        </span>

                        {/* Reversed badge */}
                        {card.isReversed && (
                            <div style={{
                                position: "absolute",
                                top: 6, right: 6,
                                fontSize: "0.45rem",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                background: "#8b1a1a",
                                color: "#ffd0d0",
                                padding: "2px 5px",
                                borderRadius: 3,
                            }}>
                                RX
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Upright / Reversed label — fades in after flip */}
            <span style={{
                fontSize: "0.65rem",
                color: card.isReversed ? "#c07070" : "#c8a96e",
                opacity: flipped ? 1 : 0,
                transition: "opacity 0.4s ease 0.3s",
            }}>
                {card.isReversed ? "↓ Reversed" : "↑ Upright"}
            </span>

        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Main export — drop this into your page.tsx
// ─────────────────────────────────────────────────────────────
export default function CardSpread({ cards }: { cards: DrawnCard[] }) {
    return (
        <div style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            justifyContent: "center",
        }}>
            {cards.map((card, i) => (
                <TarotCard
                    key={card.id}
                    card={card}
                    dealDelay={i * DEAL_STAGGER_MS + i * FLIP_STAGGER_MS}
                />
            ))}
        </div>
    )
}