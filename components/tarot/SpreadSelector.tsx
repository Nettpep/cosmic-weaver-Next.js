'use client';

import React, { useState, useEffect } from 'react';
import { SpreadConfig } from '@/types/tarot';
import { spreadsList } from '@/data/spreadConfigs';
import '@/styles/tarot.css';

interface SpreadSelectorProps {
    onSelectSpread: (spread: SpreadConfig) => void;
}

const difficultyColors = {
    beginner: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    intermediate: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    advanced: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'
};

const difficultyLabels = {
    beginner: 'เหมาะสำหรับผู้เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ขั้นสูง'
};

export default function SpreadSelector({ onSelectSpread }: SpreadSelectorProps) {
    // Fix hydration mismatch: render stars only on client side
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="tarot-container" style={{ padding: '40px 20px', minHeight: '100vh' }}>
            {/* Stars Background - render only after mount to avoid hydration mismatch */}
            <div className="stars-background">
                {isMounted && Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="mystical-title" style={{ marginBottom: '16px' }}>
                        เลือกรูปแบบการดูดวง
                    </h1>
                    <p className="elegant-text" style={{ fontSize: '1.1rem' }}>
                        เลือกรูปแบบที่เหมาะกับคำถามของคุณ
                    </p>
                </div>

                {/* Spread Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    {spreadsList.map((spread) => (
                        <div
                            key={spread.type}
                            className="spread-card"
                            onClick={() => onSelectSpread(spread)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}
                        >
                            {/* Icon & Title */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '2.5rem' }}>{spread.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <h3 className="thai-title" style={{ fontSize: '1.3rem', marginBottom: '4px' }}>
                                        {spread.nameThai}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'var(--font-elegant)',
                                        fontSize: '0.9rem',
                                        color: 'var(--cosmic-lavender)',
                                        fontStyle: 'italic'
                                    }}>
                                        {spread.name}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="thai-body" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {spread.descriptionThai}
                            </p>

                            {/* Card Count */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.2rem' }}>🎴</span>
                                <span className="thai-body" style={{ fontSize: '0.9rem' }}>
                                    {spread.cardCount} ใบ
                                </span>
                            </div>

                            {/* Difficulty Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                background: difficultyColors[spread.difficulty],
                                color: 'white',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                fontFamily: 'var(--font-thai)',
                                alignSelf: 'flex-start',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}>
                                {difficultyLabels[spread.difficulty]}
                            </div>

                            {/* Hover Instruction */}
                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '16px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                textAlign: 'center',
                                fontFamily: 'var(--font-thai)',
                                fontSize: '0.9rem',
                                color: 'var(--cosmic-gold)',
                                fontWeight: 500
                            }}>
                                คลิกเพื่อเริ่มดูดวง →
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div style={{
                    background: 'var(--gradient-glass)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '32px',
                    textAlign: 'center'
                }}>
                    <h3 className="thai-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
                        💡 คำแนะนำ
                    </h3>
                    <div className="thai-body" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                        <p style={{ marginBottom: '12px' }}>
                            <strong style={{ color: 'var(--cosmic-gold)' }}>ผู้เริ่มต้น:</strong> เริ่มจากไพ่ 1-3 ใบเพื่อทำความคุ้นเคย
                        </p>
                        <p style={{ marginBottom: '12px' }}>
                            <strong style={{ color: 'var(--cosmic-gold)' }}>ระดับกลาง:</strong> ลองใช้ Horseshoe หรือ Chakra เมื่อต้องการข้อมูลเชิงลึกมากขึ้น
                        </p>
                        <p>
                            <strong style={{ color: 'var(--cosmic-gold)' }}>ขั้นสูง:</strong> Celtic Cross และ Astrological ให้ภาพรวมที่ครอบคลุมที่สุด
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
