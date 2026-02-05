'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';
import { TarotCard as TarotCardType, CardPosition } from '@/types/tarot';
import '@/styles/tarot.css';

interface TarotCardProps {
    card: TarotCardType;
    position?: CardPosition;
    isFlipped?: boolean;
    onClick?: () => void;
    showBack?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    style?: CSSProperties;
}

const sizeMap = {
    small: { width: 120, height: 200 },
    medium: { width: 180, height: 300 },
    large: { width: 240, height: 400 }
};

export default function TarotCard({
    card,
    position = 'upright',
    isFlipped = false,
    onClick,
    showBack = false,
    size = 'medium',
    className = '',
    style = {}
}: TarotCardProps) {
    const dimensions = sizeMap[size];
    const isReversed = position === 'reversed';

    const BackFace = () => (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
            }}
        >
            <Image
                src="/images/occult_eye_back.jpg"
                alt="Tarot card back"
                fill
                style={{ objectFit: 'cover' }}
            />
        </div>
    );

    // When selecting cards from the deck, show only the back side
    // Use a simple static card (no 3D flip) so it always faces the user
    if (showBack) {
        return (
            <div
                className={`tarot-card ${className}`}
                onClick={onClick}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    cursor: onClick ? 'pointer' : 'default',
                    ...style
                }}
            >
                <BackFace />
            </div>
        );
    }

    return (
        <div
            className={`tarot-card ${isFlipped ? 'flipped' : ''} ${isReversed ? 'reversed' : ''} ${className}`}
            onClick={onClick}
            style={{
                width: dimensions.width,
                height: dimensions.height,
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
        >
            <div className="tarot-card-inner">
                {/* Card Back */}
                <div className="tarot-card-face tarot-card-back">
                    <BackFace />
                </div>

                {/* Card Front */}
                <div className="tarot-card-face tarot-card-front">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}>
                        {/* Full card image as background */}
                        {card.imageUrl ? (
                            <Image
                                src={card.imageUrl}
                                alt={card.nameThai}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)'
                            }}>
                                <span style={{
                                    fontSize: size === 'small' ? '2rem' : size === 'medium' ? '3rem' : '4rem',
                                    filter: 'drop-shadow(0 0 10px var(--cosmic-gold))'
                                }}>
                                    {card.arcana === 'major' ? '✨' :
                                        card.suit === 'wands' ? '🔥' :
                                            card.suit === 'cups' ? '💧' :
                                                card.suit === 'swords' ? '⚔️' :
                                                    card.suit === 'pentacles' ? '💎' : '🌟'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
