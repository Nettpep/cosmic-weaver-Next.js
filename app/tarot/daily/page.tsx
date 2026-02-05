'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTarotStore } from '@/store/tarotStore';
import { spreadConfigs } from '@/data/spreadConfigs';
import TarotCard from '@/components/tarot/TarotCard';
import Navigation from '@/components/Navigation';
import '@/styles/tarot.css';

export default function DailyReadingPage() {
    const router = useRouter();
    const { getDailyReading, startReading, drawCard, saveReading, readingStreak } = useTarotStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const dailyReading = getDailyReading();
    const singleSpread = spreadConfigs.single;

    useEffect(() => {
        // Auto-generate daily reading if not exists
        if (!dailyReading) {
            startReading(singleSpread);
            const drawn = drawCard();
            if (drawn) {
                saveReading('Daily guidance for today');
            }
        }
    }, []);

    const today = new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (!dailyReading) {
        return (
            <>
                <Navigation />
                <div className="tarot-container" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '64px'
                }}>
                    <div className="cosmic-spinner" />
                </div>
            </>
        );
    }

    const drawnCard = dailyReading.drawnCards[0];

    return (
        <>
            <Navigation />
            <div className="tarot-container" style={{ minHeight: '100vh', padding: '40px 20px', paddingTop: '104px' }}>
            {/* Stars Background */}
            <div className="stars-background">
                {mounted && Array.from({ length: 50 }).map((_, i) => (
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

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="mystical-title" style={{ fontSize: '3rem', marginBottom: '16px' }}>
                        ดูดวงรายวัน
                    </h1>
                    <p className="elegant-text" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                        {today}
                    </p>

                    {/* Streak Counter */}
                    {readingStreak > 0 && (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--gradient-gold)',
                            color: 'var(--cosmic-deep-purple)',
                            padding: '12px 24px',
                            borderRadius: '24px',
                            fontFamily: 'var(--font-thai-display)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            marginTop: '16px',
                            boxShadow: 'var(--glow-gold)'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🔥</span>
                            <span>Streak: {readingStreak} วันติดต่อกัน!</span>
                        </div>
                    )}
                </div>

                {/* Card Display */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div style={{ display: 'inline-block', position: 'relative' }}>
                        {/* Glow effect */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            height: '500px',
                            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                            animation: 'pulse 3s ease-in-out infinite',
                            zIndex: -1
                        }} />

                        <TarotCard
                            card={drawnCard.card}
                            position={drawnCard.position}
                            isFlipped={true}
                            size="large"
                        />
                    </div>
                </div>

                {/* Card Interpretation */}
                <div style={{
                    background: 'var(--gradient-glass)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '40px'
                }}>
                    {/* Card Name */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h2 className="thai-title" style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--cosmic-gold)' }}>
                            {drawnCard.card.nameThai}
                        </h2>
                        <p className="elegant-text" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
                            {drawnCard.card.name}
                        </p>
                        <div style={{
                            display: 'inline-block',
                            marginTop: '12px',
                            padding: '8px 20px',
                            background: drawnCard.position === 'upright'
                                ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
                                : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                            borderRadius: '20px',
                            color: 'white',
                            fontFamily: 'var(--font-thai)',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            {drawnCard.position === 'upright' ? '🔼 คว่ำ (Upright)' : '🔽 หงาย (Reversed)'}
                        </div>
                    </div>

                    {/* Keywords */}
                    <div style={{ marginBottom: '32px' }}>
                        <h3 className="thai-title" style={{ fontSize: '1.2rem', marginBottom: '16px', textAlign: 'center' }}>
                            🔑 คีย์เวิร์ด
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            justifyContent: 'center'
                        }}>
                            {(drawnCard.position === 'upright'
                                ? drawnCard.card.keywords.upright
                                : drawnCard.card.keywords.reversed
                            ).map((keyword, index) => (
                                <span
                                    key={index}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '12px',
                                        fontFamily: 'var(--font-thai)',
                                        fontSize: '0.95rem',
                                        color: 'var(--cosmic-light-purple)'
                                    }}
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Meaning */}
                    <div style={{ marginBottom: '32px' }}>
                        <h3 className="thai-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
                            📖 ความหมาย
                        </h3>
                        <p className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {drawnCard.position === 'upright'
                                ? drawnCard.card.meaning.upright
                                : drawnCard.card.meaning.reversed}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="thai-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
                            💭 คำแนะนำสำหรับวันนี้
                        </h3>
                        <p className="thai-body" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                            {drawnCard.card.description}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className="glass-button"
                        onClick={() => router.push('/tarot/reading')}
                    >
                        🔮 ดูดวงแบบอื่น
                    </button>
                    <button
                        className="glass-button"
                        onClick={() => router.push('/tarot')}
                    >
                        🏠 กลับหน้าหลัก
                    </button>
                </div>

                {/* Reminder */}
                <div style={{
                    marginTop: '60px',
                    textAlign: 'center',
                    padding: '24px',
                    background: 'rgba(138, 43, 226, 0.1)',
                    border: '2px solid rgba(138, 43, 226, 0.3)',
                    borderRadius: '16px'
                }}>
                    <p className="thai-body" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        💡 <strong style={{ color: 'var(--cosmic-gold)' }}>เคล็ดลับ:</strong> กลับมาดูดวงรายวันทุกวันเพื่อเพิ่ม Streak และรับคำแนะนำต่อเนื่อง!
                    </p>
                </div>
            </div>
            </div>
        </>
    );
}
