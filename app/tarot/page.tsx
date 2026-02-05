'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTarotStore } from '@/store/tarotStore';
import Navigation from '@/components/Navigation';
import '@/styles/tarot.css';

export default function TarotPage() {
    const router = useRouter();
    const { getDailyReading, readingStreak } = useTarotStore();
    const [mounted, setMounted] = useState(false);
    const [hasDailyReading, setHasDailyReading] = useState(false);

    // Avoid reading persisted Zustand state during SSR to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
        setHasDailyReading(getDailyReading() !== null);
    }, [getDailyReading]);

    const features = [
        {
            icon: '🎴',
            title: 'ไพ่ทาโรต์ครบชุด',
            description: '78 ใบพร้อมคำอธิบายภาษาไทยทุกใบ'
        },
        {
            icon: '🔮',
            title: '8 รูปแบบการดูดวง',
            description: 'ตั้งแต่เบื้องต้นจนถึงขั้นสูง'
        },
        {
            icon: '✨',
            title: 'ประสบการณ์เหนือจริง',
            description: 'UI สวยงาม Animation ลื่นไหล'
        },
        {
            icon: '📅',
            title: 'ดูดวงรายวัน',
            description: 'รับคำแนะนำทุกวัน พร้อม Streak'
        }
    ];

    return (
        <>
            <Navigation />
            <div className="tarot-container" style={{ paddingTop: '64px' }}>
                {/* Stars Background */}
                <div className="stars-background">
                {mounted && Array.from({ length: 100 }).map((_, i) => (
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

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo/Title */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🌙✨🔮</div>
                    <h1 className="mystical-title" style={{ fontSize: '4rem', marginBottom: '16px' }}>
                        Cosmic Weaver
                    </h1>
                    <p className="elegant-text" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                        ทอผ้าแห่งโชคชะตา
                    </p>
                    <p className="thai-body" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        สัมผัสประสบการณ์การดูดวงด้วยไพ่ทาโรต์แบบที่คุณไม่เคยพบเจอ
                        พร้อม UI ที่สวยงามและน่าประทับใจ
                    </p>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                        className="glass-button glass-button-gold"
                        onClick={() => router.push('/tarot/daily')}
                        style={{
                            fontSize: '1.3rem',
                            padding: '20px 48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <span>🌅</span>
                        <div style={{ textAlign: 'left' }}>
                            <div>ดูดวงรายวัน</div>
                            {readingStreak > 0 && (
                                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                    🔥 Streak: {readingStreak} วัน
                                </div>
                            )}
                        </div>
                    </button>

                    <button
                        className="glass-button"
                        onClick={() => router.push('/tarot/reading')}
                        style={{
                            fontSize: '1.3rem',
                            padding: '20px 48px'
                        }}
                    >
                        🔮 เริ่มดูดวง
                    </button>
                </div>

                {/* Daily Reading Status */}
                {hasDailyReading && (
                    <div style={{
                        background: 'var(--gradient-glass)',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        padding: '20px 32px',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>✅</span>
                        <span className="thai-body" style={{ fontSize: '1.1rem' }}>
                            คุณได้ดูดวงรายวันวันนี้แล้ว
                        </span>
                    </div>
                )}

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                    maxWidth: '1000px',
                    width: '100%'
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="spread-card"
                            style={{
                                textAlign: 'center',
                                padding: '32px 24px'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                                {feature.icon}
                            </div>
                            <h3 className="thai-title" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>
                                {feature.title}
                            </h3>
                            <p className="thai-body" style={{ fontSize: '1rem' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'float 2s ease-in-out infinite'
                }}>
                    <div style={{
                        width: '40px',
                        height: '60px',
                        border: '3px solid var(--cosmic-gold)',
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '8px'
                    }}>
                        <div style={{
                            width: '6px',
                            height: '12px',
                            background: 'var(--cosmic-gold)',
                            borderRadius: '3px',
                            animation: 'scroll 1.5s ease-in-out infinite'
                        }} />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{
                minHeight: '100vh',
                padding: '80px 20px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 className="mystical-title" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>
                        วิธีการใช้งาน
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {[
                            { step: 1, icon: '🔮', title: 'เลือกรูปแบบการดูดวง', desc: 'เลือกจาก 8 รูปแบบที่เหมาะกับคำถามของคุณ' },
                            { step: 2, icon: '❓', title: 'ตั้งคำถาม', desc: 'ระบุคำถามหรือสิ่งที่ต้องการคำแนะนำ' },
                            { step: 3, icon: '🔀', title: 'สับและตัดไพ่', desc: 'จดจ่อกับคำถาม แล้วสับและตัดสำรับไพ่' },
                            { step: 4, icon: '👆', title: 'จั่วไพ่', desc: 'เลือกไพ่ด้วยสัญชาตญาณของคุณ' },
                            { step: 5, icon: '📖', title: 'รับคำตอบ', desc: 'อ่านการตีความหมายและคำแนะนำ' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '32px',
                                    background: 'var(--gradient-glass)',
                                    backdropFilter: 'blur(15px)',
                                    border: '2px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '20px',
                                    padding: '32px',
                                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                                }}
                            >
                                <div style={{
                                    minWidth: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    boxShadow: 'var(--glow-gold)'
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 className="thai-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                                        {item.step}. {item.title}
                                    </h3>
                                    <p className="thai-body" style={{ fontSize: '1.1rem' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '80px 20px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <h2 className="mystical-title" style={{ fontSize: '3rem', marginBottom: '24px' }}>
                    พร้อมเริ่มต้นแล้วหรือยัง?
                </h2>
                <p className="thai-body" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    ค้นพบคำตอบที่คุณกำลังมองหา ผ่านพลังแห่งไพ่ทาโรต์
                </p>

                <button
                    className="glass-button glass-button-gold"
                    onClick={() => router.push('/tarot/reading')}
                    style={{
                        fontSize: '1.5rem',
                        padding: '24px 64px'
                    }}
                >
                    เริ่มดูดวงเลย ✨
                </button>
            </section>
            </div>
        </>
    );
}

