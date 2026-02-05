'use client';

import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';
import TarotCardModal from './TarotCardModal';
import { DrawnCard, SpreadConfig } from '@/types/tarot';
import '@/styles/tarot.css';

interface SpreadLayoutProps {
    spread: SpreadConfig;
    drawnCards: DrawnCard[];
    onCardClick?: (index: number) => void;
    showCardDetails?: boolean;
    animateReveal?: boolean;
}

export default function SpreadLayout({
    spread,
    drawnCards,
    onCardClick,
    showCardDetails = false,
    animateReveal = true
}: SpreadLayoutProps) {
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);

    // Auto-reveal cards one by one with animation
    useEffect(() => {
        if (animateReveal && drawnCards.length > 0) {
            setRevealedIndices(new Set());

            drawnCards.forEach((_, index) => {
                setTimeout(() => {
                    setRevealedIndices(prev => new Set([...prev, index]));
                }, index * 600); // Stagger by 600ms
            });
        } else {
            setRevealedIndices(new Set(drawnCards.map((_, i) => i)));
        }
    }, [drawnCards.length, animateReveal]);

    const handleCardClick = (index: number) => {
        const drawnCard = drawnCards[index];
        if (drawnCard) {
            setSelectedCard(drawnCard);
        }
        if (onCardClick) {
            onCardClick(index);
        }
    };

    // Determine card size based on number of cards
    const getCardSize = (): 'small' | 'medium' | 'large' => {
        if (spread.cardCount === 1) return 'large';
        if (spread.cardCount <= 3) return 'medium';
        if (spread.cardCount <= 7) return 'small';
        return 'small';
    };

    // Scale the layout container based on card count
    const getContainerScale = () => {
        if (spread.cardCount > 10) return 0.7;
        if (spread.cardCount > 7) return 0.8;
        return 1;
    };

    const currentCardSize = getCardSize();
    const getPlaceholderDimensions = () => {
        switch (currentCardSize) {
            case 'large': return { width: '240px', height: '400px' };
            case 'medium': return { width: '180px', height: '300px' };
            case 'small': return { width: '120px', height: '200px' };
            default: return { width: '180px', height: '300px' };
        }
    };
    const placeholderDimensions = getPlaceholderDimensions();

    return (
        <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px'
        }}>
            {/* Spread Title */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 className="mystical-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>
                    {spread.nameThai}
                </h2>
                <p className="elegant-text" style={{ fontSize: '1rem' }}>
                    {spread.descriptionThai}
                </p>
            </div>

            {/* Cards Layout */}
            <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%', // Square aspect ratio
                minHeight: '600px',
                transform: `scale(${getContainerScale()})`,
                transformOrigin: 'top center'
            }}>
                {spread.positions.map((position, index) => {
                    const drawnCard = drawnCards[index];
                    const isRevealed = revealedIndices.has(index);
                    const cardSize = getCardSize();

                    return (
                        <div
                            key={position.index}
                            style={{
                                position: 'absolute',
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                transform: `translate(-50%, -50%) ${position.rotation ? `rotate(${position.rotation}deg)` : ''}`,
                                opacity: isRevealed ? 1 : 0,
                                transition: 'opacity 0.6s ease, transform 0.6s ease',
                                zIndex: isRevealed ? 10 : 1
                            }}
                        >
                            {/* Position Label */}
                            <div style={{
                                position: 'absolute',
                                top: '-40px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                whiteSpace: 'nowrap',
                                fontFamily: 'var(--font-thai)',
                                fontSize: '0.85rem',
                                color: 'var(--cosmic-gold)',
                                fontWeight: 600,
                                textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                backdropFilter: 'blur(5px)'
                            }}>
                                {position.labelThai}
                            </div>

                            {/* Card or Placeholder */}
                            {drawnCard ? (
                                <div
                                    style={{
                                        animation: isRevealed ? 'fadeInScale 0.6s ease forwards' : 'none'
                                    }}
                                >
                                    <TarotCard
                                        card={drawnCard.card}
                                        position={drawnCard.position}
                                        size={cardSize as 'small' | 'medium' | 'large'}
                                        onClick={() => handleCardClick(index)}
                                    />
                                </div>
                            ) : (
                                // Empty slot placeholder
                                <div style={{
                                    width: cardSize === 'small' ? '120px' : cardSize === 'medium' ? '180px' : '240px',
                                    height: cardSize === 'small' ? '200px' : cardSize === 'medium' ? '300px' : '400px',
                                    border: '2px dashed var(--cosmic-lavender)',
                                    borderRadius: '12px',
                                    background: 'rgba(138, 43, 226, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-thai)',
                                    color: 'var(--cosmic-lavender)',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    padding: '20px'
                                }}>
                                    รอการจั่วไพ่
                                </div>
                            )}

                            {/* Card Details (on hover or click) */}
                            {showCardDetails && drawnCard && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '16px',
                                    background: 'var(--gradient-glass)',
                                    backdropFilter: 'blur(15px)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    minWidth: '250px',
                                    maxWidth: '300px',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                                    zIndex: 20,
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    transition: 'opacity 0.3s ease'
                                }}
                                    className="card-details"
                                >
                                    <h4 style={{
                                        fontFamily: 'var(--font-thai-display)',
                                        color: 'var(--cosmic-gold)',
                                        fontSize: '1.1rem',
                                        marginBottom: '8px'
                                    }}>
                                        {drawnCard.card.nameThai}
                                    </h4>
                                    <p style={{
                                        fontFamily: 'var(--font-elegant)',
                                        color: 'var(--cosmic-lavender)',
                                        fontSize: '0.85rem',
                                        fontStyle: 'italic',
                                        marginBottom: '12px'
                                    }}>
                                        {drawnCard.position === 'upright' ? 'คว่ำ (Upright)' : 'หงาย (Reversed)'}
                                    </p>
                                    <p style={{
                                        fontFamily: 'var(--font-thai)',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6'
                                    }}>
                                        {drawnCard.position === 'upright'
                                            ? drawnCard.card.meaning.upright
                                            : drawnCard.card.meaning.reversed}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Card Count Progress */}
            <div style={{
                marginTop: '40px',
                textAlign: 'center',
                fontFamily: 'var(--font-thai)',
                color: 'var(--cosmic-light-purple)',
                fontSize: '1.1rem'
            }}>
                ไพ่ที่จั่วแล้ว: {drawnCards.length} / {spread.cardCount}
            </div>

            {/* Card Detail Modal */}
            {selectedCard && (
                <TarotCardModal
                    card={selectedCard.card}
                    position={selectedCard.position}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
}
