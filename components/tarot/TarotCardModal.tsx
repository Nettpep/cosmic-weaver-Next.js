'use client';

import React, { useState, useEffect } from 'react';
import { TarotCard as TarotCardType, CardPosition } from '@/types/tarot';
import Image from 'next/image';
import { X } from 'lucide-react';
import { getExtendedMeaning, ExtendedMeaning } from '@/lib/tarotMeanings';
import '@/styles/tarot.css';

interface TarotCardModalProps {
    card: TarotCardType;
    position: CardPosition;
    onClose: () => void;
}

export default function TarotCardModal({ card, position, onClose }: TarotCardModalProps) {
    const isReversed = position === 'reversed';
    const [extendedMeaning, setExtendedMeaning] = useState<ExtendedMeaning | null>(null);

    useEffect(() => {
        // Load extended meaning from tarot_meanings_data.js
        const extended = getExtendedMeaning(card.name);
        setExtendedMeaning(extended);
    }, [card.name]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-900/50 rounded-2xl border-2 border-cosmic-gold/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px rgba(255, 215, 0, 0.3)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                    <X className="w-6 h-6 text-cosmic-gold" />
                </button>

                <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card Image */}
                        <div className="flex flex-col items-center">
                            <div
                                className="relative w-full max-w-[300px] aspect-[2/3] rounded-xl overflow-hidden border-4 border-cosmic-gold shadow-xl"
                                style={{
                                    transform: isReversed ? 'rotate(180deg)' : 'none',
                                    boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)'
                                }}
                            >
                                <Image
                                    src={card.imageUrl}
                                    alt={card.nameThai}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Position Badge */}
                            <div
                                className="mt-4 px-6 py-2 rounded-full font-semibold text-sm"
                                style={{
                                    background: isReversed
                                        ? 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'
                                        : 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                    color: 'white'
                                }}
                            >
                                {isReversed ? '🔽 หงาย (Reversed)' : '🔼 คว่ำ (Upright)'}
                            </div>
                        </div>

                        {/* Card Details */}
                        <div className="flex flex-col gap-6">
                            {/* Card Name */}
                            <div>
                                <h2
                                    className="thai-title text-4xl mb-2"
                                    style={{
                                        textAlign: 'left',
                                        lineHeight: 1.3,
                                        background: 'var(--gradient-gold)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        // Ensure accents/วรรณยุกต์ไม่ถูกตัด
                                        paddingTop: '0.15rem',
                                    }}
                                >
                                    {card.nameThai}
                                </h2>
                                <p className="elegant-text text-xl italic text-cosmic-lavender">
                                    {card.name}
                                </p>
                                {card.arcana === 'major' && (
                                    <p className="text-sm text-cosmic-gold mt-1">
                                        ✨ Major Arcana - {card.number}
                                    </p>
                                )}
                                {card.arcana === 'minor' && (
                                    <p className="text-sm text-cosmic-gold mt-1">
                                        🎴 {card.suit.charAt(0).toUpperCase() + card.suit.slice(1)} - {card.number}
                                    </p>
                                )}
                            </div>

                            {/* Keywords */}
                            <div>
                                <h3 className="thai-title text-lg mb-3 flex items-center gap-2">
                                    <span>🔑</span> คีย์เวิร์ด
                                </h3>
                                {extendedMeaning ? (
                                    <p className="thai-body text-base leading-relaxed text-cosmic-gold/90 mb-2">
                                        {extendedMeaning.keywords}
                                    </p>
                                ) : null}
                                <div className="flex flex-wrap gap-2">
                                    {(isReversed ? card.keywords.reversed : card.keywords.upright).map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-lg text-sm font-medium"
                                            style={{
                                                background: 'rgba(255, 215, 0, 0.1)',
                                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                                color: 'var(--cosmic-gold)'
                                            }}
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Meaning */}
                            <div>
                                <h3 className="thai-title text-lg mb-3 flex items-center gap-2">
                                    <span>📖</span> ความหมาย
                                </h3>
                                <p className="thai-body text-base leading-relaxed text-white/90 mb-4">
                                    {extendedMeaning 
                                        ? (isReversed ? extendedMeaning.meaning_rev : extendedMeaning.meaning_up)
                                        : (isReversed ? card.meaning.reversed : card.meaning.upright)
                                    }
                                </p>
                                {card.description && (
                                    <p className="thai-body text-sm leading-relaxed text-white/70 italic">
                                        {card.description}
                                    </p>
                                )}
                            </div>

                            {/* Code Meaning (รหัสลับ) */}
                            {extendedMeaning?.code_meaning && (
                                <div>
                                    <h3 className="thai-title text-lg mb-3 flex items-center gap-2">
                                        <span>🔮</span> รหัสลับของไพ่
                                    </h3>
                                    <p className="thai-body text-base leading-relaxed text-purple-200">
                                        {extendedMeaning.code_meaning}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
