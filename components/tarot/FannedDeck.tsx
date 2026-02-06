'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/types/tarot';
import '@/styles/tarot.css';

interface FannedDeckProps {
    cards: TarotCardType[];
    onCardSelect: (cardId: string) => void;
    size?: 'small' | 'medium' | 'large';
    maxVisibleCards?: number;
}

/**
 * FannedDeck - แสดงไพ่แบบเรียงเป็นวงกลมลึกลับ (Mystical Circle Layout)
 * ให้ผู้ใช้เลือกไพ่ได้อย่างสมจริง พร้อม Hover & Pick Animations
 * พร้อมวงกลมมนต์เวทที่หมุนช้าๆ เพิ่มบรรยากาศพิธีกรรม
 */
export default function FannedDeck({
    cards,
    onCardSelect,
    size = 'medium',
    maxVisibleCards = 78 // แสดงครบ 78 ใบเป็น default (วงกลม 2 ชั้น)
}: FannedDeckProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [pickingIndex, setPickingIndex] = useState<number | null>(null);
    // Track ไพ่ที่เคยแสดงแล้ว เพื่อไม่ให้ initial animation ทำงานซ้ำ
    const hasRenderedRef = useRef<Set<string>>(new Set());

    // แสดงไพ่ได้สูงสุด 78 ใบ (วงกลม 2 ชั้น)
    // จำกัดไม่ให้เกิน 78 ใบเพื่อป้องกันการแสดงไพ่ซ้ำ
    // Filter duplicate cards โดยใช้ Set เพื่อเก็บ card.id ที่เจอแล้ว
    // คำนวณใหม่ทุกครั้งที่ cards เปลี่ยน (ไม่ใช้ useMemo เพื่อให้ตัวเลขอัปเดตทันที)
    const uniqueCards: TarotCardType[] = [];
    const seenIds = new Set<string>();
    
    for (const card of cards) {
        if (!seenIds.has(card.id)) {
            seenIds.add(card.id);
            uniqueCards.push(card);
        }
    }
    
    const maxCards = Math.min(uniqueCards.length, 78, maxVisibleCards);
    const visibleCards = uniqueCards.slice(0, maxCards);
    const totalCards = visibleCards.length;

    // Track ไพ่ที่แสดงแล้ว
    useEffect(() => {
        visibleCards.forEach(card => {
            hasRenderedRef.current.add(card.id);
        });
    }, [visibleCards]);

    // แบ่งไพ่เป็น 2 ชั้น (วงนอกและวงใน)
    const outerRingCount = Math.ceil(totalCards / 2); // วงนอก: ครึ่งบน (เศษไปวงนอก)
    const innerRingCount = totalCards - outerRingCount; // วงใน: ครึ่งล่าง

    // คำนวณรัศมีของวงกลม (มี 2 ชั้น)
    const getCircleRadius = (isOuterRing: boolean) => {
        const baseRadius = size === 'small' ? 180 : size === 'medium' ? 220 : 260;
        return isOuterRing ? baseRadius : baseRadius * 0.6; // วงในเล็กกว่าวงนอก 40%
    };

    // คำนวณตำแหน่งบนวงกลม (Circle Layout with Double Ring)
    const getCirclePosition = (index: number) => {
        // แบ่งไพ่: วงนอก (0 ถึง outerRingCount-1), วงใน (outerRingCount ถึง totalCards-1)
        const isOuterRing = index < outerRingCount;
        const ringIndex = isOuterRing ? index : index - outerRingCount;
        const ringSize = isOuterRing ? outerRingCount : innerRingCount;
        
        const radius = getCircleRadius(isOuterRing);
        const angleStep = (2 * Math.PI) / ringSize;
        // วงในเริ่มต้นด้วยออฟเซ็ตเล็กน้อยเพื่อไม่ให้ทับกับวงนอกพอดี
        const angleOffset = isOuterRing ? 0 : angleStep / 2;
        const angle = angleStep * ringIndex + angleOffset - Math.PI / 2;

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            rotation: (angle * 180) / Math.PI + 90,
            isOuterRing
        };
    };

    const handleCardClick = (card: TarotCardType, index: number) => {
        setPickingIndex(index);
        
        // เล่นเสียง (optional)
        playCardSound();

        // รอ animation เสร็จแล้วค่อย callback
        setTimeout(() => {
            // ลบ card.id ออกจาก hasRenderedRef เมื่อไพ่ถูกเลือกออกไป
            hasRenderedRef.current.delete(card.id);
            onCardSelect(card.id);
            setPickingIndex(null);
        }, 600);
    };

    const playCardSound = () => {
        // TODO: เพิ่ม sound effect (optional)
        // const audio = new Audio('/sounds/card-slide.mp3');
        // audio.volume = 0.3;
        // audio.play().catch(() => {});
    };

    return (
        <div 
            key={`deck-${cards.length}-${totalCards}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
                padding: '40px 20px',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            {/* Circle Container - ขนาดใหญ่ขึ้นเพื่อรองรับวงกลม 2 ชั้น */}
            <div style={{
                position: 'relative',
                width: size === 'small' ? 'min(520px, 90vw)' : size === 'medium' ? 'min(620px, 90vw)' : 'min(720px, 90vw)',
                height: size === 'small' ? 'min(520px, 90vw)' : size === 'medium' ? 'min(620px, 90vw)' : 'min(720px, 90vw)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Mystical Circle Background - วงกลมนอกสุด (เส้นทอง) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(138, 43, 226, 0.2)',
                    animation: 'spin 60s linear infinite',
                    pointerEvents: 'none'
                }} />
                
                {/* วงกลมกลาง - เส้นม่วง (สำหรับวงไพ่ชั้นใน) */}
                <div style={{
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    border: '2px dashed rgba(176, 38, 255, 0.4)',
                    boxShadow: 'inset 0 0 30px rgba(176, 38, 255, 0.2)',
                    animation: 'spin 90s linear infinite reverse',
                    pointerEvents: 'none'
                }} />
                
                {/* วงกลมชั้นใน - เส้นทองบาง */}
                <div style={{
                    position: 'absolute',
                    width: '35%',
                    height: '35%',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.15)',
                    animation: 'spin 120s linear infinite',
                    pointerEvents: 'none'
                }} />
                
                {/* จุดศูนย์กลาง - สัญลักษณ์ดวงตา */}
                <div style={{
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(138, 43, 226, 0.2) 100%)',
                    border: '2px solid rgba(255, 215, 0, 0.6)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    pointerEvents: 'none',
                    zIndex: 0
                }}>
                    🔮
                </div>
                
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleCards.map((card, index) => {
                        const { x, y, rotation, isOuterRing } = getCirclePosition(index);
                        const isHovered = hoveredIndex === index;
                        const isPicking = pickingIndex === index;
                        // วงนอกใหญ่กว่าวงในเล็กน้อย
                        const cardScale = isOuterRing ? 0.75 : 0.65;

                        const hasRendered = hasRenderedRef.current.has(card.id);
                        
                        return (
                            <motion.div
                                key={card.id}
                                layoutId={card.id}
                                initial={hasRendered ? false : {
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    opacity: isPicking ? 0 : 1,
                                    scale: isPicking ? 0 : (isHovered ? cardScale * 1.15 : cardScale),
                                    rotate: isPicking ? rotation + 180 : rotation,
                                    x: isPicking ? 0 : x,
                                    y: isPicking ? 0 : y,
                                    z: isHovered ? 60 : 0,
                                    filter: isPicking ? 'blur(10px)' : 'none'
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0,
                                    x: 0,
                                    y: 0,
                                    rotate: rotation + 360,
                                    transition: { 
                                        duration: 0.8,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }
                                }}
                                transition={hasRendered ? {
                                    // สำหรับไพ่ที่เคยแสดงแล้ว: ขยับไปตำแหน่งใหม่แบบ smooth แต่ไม่ re-animate opacity/scale
                                    layout: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 35
                                    },
                                    x: { type: 'spring', stiffness: 400, damping: 35 },
                                    y: { type: 'spring', stiffness: 400, damping: 35 },
                                    rotate: { type: 'spring', stiffness: 400, damping: 35 },
                                    opacity: { duration: 0 },
                                    scale: { duration: 0 }
                                } : {
                                    // สำหรับไพ่ใหม่: ใช้ spring animation แบบเต็ม
                                    layout: {
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30
                                    },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 },
                                    rotate: { duration: 0.3 },
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    y: { type: 'spring', stiffness: 300, damping: 30 }
                                }}
                                whileHover={{
                                    scale: cardScale * 1.15,
                                    z: 60,
                                    transition: { duration: 0.2 }
                                }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onClick={() => handleCardClick(card, index)}
                                style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    transformStyle: 'preserve-3d',
                                    transformOrigin: 'center center',
                                    zIndex: isHovered ? 999 : index, // ไพ่ที่ hover มี z-index สูงสุด
                                    filter: isHovered 
                                        ? 'drop-shadow(0 20px 40px rgba(255, 215, 0, 0.6)) brightness(1.15)' 
                                        : 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.4))'
                                }}
                            >
                                <TarotCard
                                    card={card}
                                    showBack={true}
                                    size={size}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleCards.length * 0.05 + 0.4 }}
                style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-thai)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}
            >
                <div style={{
                    color: 'var(--cosmic-gold)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                }}>
                    🔮 วงกลมลึกลับ 2 ชั้น - เลือกไพ่ที่เรียกหาคุณ 🔮
                </div>
                <motion.div
                    key={`${outerRingCount}-${innerRingCount}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        color: 'var(--cosmic-lavender)',
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        fontStyle: 'italic'
                    }}
                >
                    (วงนอก {outerRingCount} ใบ | วงใน {innerRingCount} ใบ | รวม {totalCards} ใบ)
                </motion.div>
            </motion.div>

            {/* Card Counter with Progress */}
            <motion.div
                key={totalCards}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                    fontFamily: 'var(--font-thai)',
                    textAlign: 'center',
                    opacity: 0.9,
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <div style={{ 
                    color: 'var(--cosmic-gold)', 
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                    marginBottom: '12px'
                }}>
                    เหลือไพ่ {totalCards} ใบ
                </div>
                
                {/* Progress Bar */}
                {maxVisibleCards && maxVisibleCards > 0 && (
                    <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginTop: '8px'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                                width: `${(totalCards / maxVisibleCards) * 100}%` 
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                background: 'var(--gradient-gold)',
                                borderRadius: '10px',
                                boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
                            }}
                        />
                    </div>
                )}
                
                {cards.length > 78 && (
                    <span style={{ 
                        fontSize: '0.85rem', 
                        opacity: 0.7, 
                        display: 'block', 
                        marginTop: '8px',
                        color: 'var(--cosmic-lavender)'
                    }}>
                        (แสดง {maxCards} ใบแรก)
                    </span>
                )}
            </motion.div>
        </div>
    );
}
