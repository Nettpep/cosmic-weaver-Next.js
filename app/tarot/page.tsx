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
                        เปิดเผยความลับแห่งโชคชะตา
                    </p>
                    <p className="thai-body" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        ค้นพบคำตอบที่ซ่อนอยู่ในไพ่ทาโรต์ 78 ใบ
                        ผ่านประสบการณ์ที่ลึกลับและเต็มไปด้วยพลังแห่งจักรวาล
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
            </section>

            {/* Guidelines Section */}
            <section style={{
                padding: '80px 20px',
                position: 'relative',
                zIndex: 1,
                background: 'linear-gradient(180deg, transparent 0%, rgba(138, 43, 226, 0.05) 50%, transparent 100%)'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 className="mystical-title" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>
                        ⚖️ กฎเกณฑ์และคำแนะนำ
                    </h2>
                    <p className="thai-body" style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '50px', opacity: 0.9 }}>
                        เพื่อให้การดูดวงมีประสิทธิภาพและแม่นยำที่สุด
                    </p>

                    <div style={{
                        background: 'var(--gradient-glass)',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 8px 32px rgba(138, 43, 226, 0.2)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    minWidth: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    boxShadow: 'var(--glow-gold)',
                                    flexShrink: 0
                                }}>
                                    ⏰
                                </div>
                                <div>
                                    <h3 className="thai-title" style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--cosmic-gold)' }}>
                                        ความถี่ในการดูดวง
                                    </h3>
                                    <p className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '12px' }}>
                                        <strong style={{ color: 'var(--cosmic-gold)' }}>ไม่ควรดูดวงบ่อยเกินไป</strong> เพราะจะทำให้ผลการทำนายไม่แม่นยำและสูญเสียความหมายที่แท้จริง
                                    </p>
                                    <div style={{
                                        background: 'rgba(255, 215, 0, 0.1)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginTop: '16px'
                                    }}>
                                        <p className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                            <strong>💡 คำแนะนำ:</strong> ควรดูดวง <strong style={{ color: 'var(--cosmic-gold)' }}>2-4 ครั้งต่อเดือน</strong> เท่านั้น<br/>
                                            สำหรับคำถามสำคัญหรือช่วงเวลาที่ต้องการคำแนะนำพิเศษ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    minWidth: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    boxShadow: 'var(--glow-gold)',
                                    flexShrink: 0
                                }}>
                                    🎯
                                </div>
                                <div>
                                    <h3 className="thai-title" style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--cosmic-gold)' }}>
                                        หลักการสำคัญ
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '12px', paddingLeft: '28px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>✨</span>
                                            <strong>ตั้งคำถามที่ชัดเจน:</strong> ยิ่งคำถามชัดเจนเท่าไหร่ คำตอบก็จะแม่นยำมากขึ้น
                                        </li>
                                        <li className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '12px', paddingLeft: '28px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>🧘</span>
                                            <strong>จดจ่อและมีสมาธิ:</strong> ระหว่างการดูดวง ควรอยู่ในสภาพแวดล้อมที่สงบและมีสมาธิ
                                        </li>
                                        <li className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '12px', paddingLeft: '28px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>💭</span>
                                            <strong>ใช้เป็นแนวทาง:</strong> ผลการดูดวงเป็นเพียงแนวทาง ไม่ใช่คำทำนายที่ตายตัว
                                        </li>
                                        <li className="thai-body" style={{ fontSize: '1.1rem', lineHeight: '2', paddingLeft: '28px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>⏳</span>
                                            <strong>เว้นระยะห่าง:</strong> ควรเว้นระยะห่างระหว่างการดูดวงแต่ละครั้งอย่างน้อย 3-7 วัน
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
                        วิธีการใช้งานแบบละเอียด
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {[
                            { 
                                step: 1, 
                                icon: '🔮', 
                                title: 'เลือกรูปแบบการดูดวง', 
                                desc: 'เลือกจาก 8 รูปแบบที่เหมาะกับคำถามของคุณ',
                                details: [
                                    'ดูดวงรายวัน: สำหรับคำแนะนำประจำวัน',
                                    'ดูดวง 3 ใบ: สำหรับคำถามทั่วไป',
                                    'ดูดวง 5 ใบ: สำหรับสถานการณ์ที่ซับซ้อน',
                                    'ดูดวง 7 ใบ: สำหรับการวิเคราะห์เชิงลึก',
                                    'ดูดวงความรัก: สำหรับเรื่องความสัมพันธ์',
                                    'ดูดวงการงาน: สำหรับเรื่องอาชีพและการเงิน',
                                    'ดูดวงอนาคต: สำหรับการวางแผนระยะยาว',
                                    'ดูดวงแบบ Celtic Cross: สำหรับการวิเคราะห์ครบวงจร'
                                ]
                            },
                            { 
                                step: 2, 
                                icon: '❓', 
                                title: 'ตั้งคำถามที่ชัดเจน', 
                                desc: 'ระบุคำถามหรือสิ่งที่ต้องการคำแนะนำอย่างชัดเจน',
                                details: [
                                    'เขียนคำถามให้ชัดเจนและเฉพาะเจาะจง',
                                    'หลีกเลี่ยงคำถามที่คลุมเครือหรือกว้างเกินไป',
                                    'ตัวอย่างคำถามที่ดี: "ฉันควรจะเปลี่ยนงานในตอนนี้หรือไม่?"',
                                    'ตัวอย่างคำถามที่ไม่ดี: "จะเกิดอะไรขึ้นกับฉัน?"',
                                    'จดจ่อกับคำถามเดียวในแต่ละครั้ง'
                                ]
                            },
                            { 
                                step: 3, 
                                icon: '🔀', 
                                title: 'สับและตัดไพ่', 
                                desc: 'จดจ่อกับคำถาม แล้วสับและตัดสำรับไพ่ด้วยความตั้งใจ',
                                details: [
                                    'ก่อนสับไพ่ ให้จดจ่อกับคำถามของคุณ',
                                    'หายใจลึกๆ และปล่อยให้จิตใจสงบ',
                                    'สับไพ่ด้วยความตั้งใจ อย่าเร่งรีบ',
                                    'ตัดไพ่ด้วยมือที่คุณรู้สึกว่าถูกต้อง',
                                    'เชื่อมั่นในสัญชาตญาณของคุณ'
                                ]
                            },
                            { 
                                step: 4, 
                                icon: '👆', 
                                title: 'จั่วไพ่ด้วยสัญชาตญาณ', 
                                desc: 'เลือกไพ่ด้วยสัญชาตญาณของคุณ ไม่ต้องคิดมาก',
                                details: [
                                    'ดูไพ่ที่เรียงเป็นวงกลมลึกลับ',
                                    'ปล่อยให้สัญชาตญาณนำทางคุณ',
                                    'ไพ่ที่ "เรียกหาคุณ" จะรู้สึกพิเศษ',
                                    'คลิกที่ไพ่ที่คุณรู้สึกว่าถูกต้อง',
                                    'อย่าคิดมากหรือลังเลนานเกินไป',
                                    'เชื่อมั่นในความรู้สึกแรกของคุณ'
                                ]
                            },
                            { 
                                step: 5, 
                                icon: '📖', 
                                title: 'อ่านและทำความเข้าใจคำตอบ', 
                                desc: 'อ่านการตีความหมายและคำแนะนำอย่างละเอียด',
                                details: [
                                    'อ่านการตีความหมายทั้งหมดอย่างละเอียด',
                                    'พิจารณาความหมายของแต่ละไพ่ในตำแหน่งของมัน',
                                    'เชื่อมโยงคำตอบกับสถานการณ์ของคุณ',
                                    'ใช้คำแนะนำเป็นแนวทางในการตัดสินใจ',
                                    'บันทึกการดูดวงเพื่อกลับมาอ่านภายหลัง',
                                    'จำไว้ว่าไพ่เป็นเพียงเครื่องมือ ไม่ใช่คำทำนายที่ตายตัว'
                                ]
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '32px',
                                    background: 'var(--gradient-glass)',
                                    backdropFilter: 'blur(15px)',
                                    border: '2px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '20px',
                                    padding: '40px',
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
                                    boxShadow: 'var(--glow-gold)',
                                    flexShrink: 0
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 className="thai-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                                        {item.step}. {item.title}
                                    </h3>
                                    <p className="thai-body" style={{ fontSize: '1.1rem', marginBottom: '20px', opacity: 0.9 }}>
                                        {item.desc}
                                    </p>
                                    {item.details && (
                                        <div style={{
                                            background: 'rgba(138, 43, 226, 0.1)',
                                            border: '1px solid rgba(138, 43, 226, 0.2)',
                                            borderRadius: '12px',
                                            padding: '20px'
                                        }}>
                                            <p className="thai-body" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', color: 'var(--cosmic-lavender)' }}>
                                                💡 รายละเอียดเพิ่มเติม:
                                            </p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {item.details.map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="thai-body" style={{ 
                                                        fontSize: '1rem', 
                                                        lineHeight: '1.8', 
                                                        marginBottom: '8px',
                                                        paddingLeft: '24px',
                                                        position: 'relative'
                                                    }}>
                                                        <span style={{ 
                                                            position: 'absolute', 
                                                            left: 0,
                                                            color: 'var(--cosmic-gold)'
                                                        }}>•</span>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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

