'use client';

import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/types/tarot';
import '@/styles/tarot.css';

interface CardDeckProps {
    cards: TarotCardType[];
    onShuffle?: () => void;
    onCut?: (position: number) => void;
    onCardDraw?: () => void;
    isShuffling?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export default function CardDeck({
    cards,
    onShuffle,
    onCut,
    onCardDraw,
    isShuffling = false,
    size = 'medium'
}: CardDeckProps) {
    const [cutPosition, setCutPosition] = useState<number | null>(null);
    const [showParticles, setShowParticles] = useState(false);

    // Top 4 cards for visual stack effect
    const visibleCards = cards.slice(0, 4);

    const handleShuffle = () => {
        if (onShuffle) {
            setShowParticles(true);
            onShuffle();
            setTimeout(() => setShowParticles(false), 1000);
        }
    };

    const handleCut = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!onCut) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const position = Math.floor((y / rect.height) * cards.length);

        setCutPosition(position);
        setTimeout(() => {
            onCut(position);
            setCutPosition(null);
        }, 500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            {/* Deck Stack */}
            <div className="tarot-deck">
                {visibleCards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`deck-card ${isShuffling ? 'shuffling' : ''}`}
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <TarotCard
                            card={card}
                            showBack={true}
                            size={size}
                            onClick={onCardDraw}
                        />
                    </div>
                ))}

                {/* Particles Effect */}
                {showParticles && (
                    <div className="particles">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Cut Position Indicator */}
                {cutPosition !== null && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-20px',
                        right: '-20px',
                        height: '4px',
                        background: 'var(--cosmic-gold)',
                        boxShadow: 'var(--glow-gold)',
                        transform: `translateY(${cutPosition * 2}px)`,
                        transition: 'transform 0.3s ease',
                        zIndex: 10
                    }} />
                )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {onShuffle && (
                    <button
                        className="glass-button"
                        onClick={handleShuffle}
                        disabled={isShuffling}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>🔀</span>
                        <span>สับไพ่</span>
                    </button>
                )}

                {onCut && (
                    <button
                        className="glass-button"
                        onClick={(e) => handleCut(e as any)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>✂️</span>
                        <span>ตัดไพ่</span>
                    </button>
                )}

                {onCardDraw && (
                    <button
                        className="glass-button glass-button-gold"
                        onClick={onCardDraw}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>👆</span>
                        <span>เลือกไพ่</span>
                    </button>
                )}
            </div>

            {/* Card Count */}
            <div style={{
                fontFamily: 'var(--font-thai)',
                color: 'var(--cosmic-light-purple)',
                fontSize: '1rem',
                textAlign: 'center'
            }}>
                เหลือไพ่ {cards.length} ใบ
            </div>
        </div>
    );
}
