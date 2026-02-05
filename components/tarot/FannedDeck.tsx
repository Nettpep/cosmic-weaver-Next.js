'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/types/tarot';
import '@/styles/tarot.css';

interface FannedDeckProps {
    cards: TarotCardType[];
    onCardSelect: (index: number) => void;
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

    // แสดงไพ่ได้สูงสุด 78 ใบ (วงกลม 2 ชั้น)
    const visibleCards = cards.slice(0, Math.min(maxVisibleCards, 78));
    const totalCards = visibleCards.length;

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

    const handleCardClick = (index: number) => {
        setPickingIndex(index);
        
        // เล่นเสียง (optional)
        playCardSound();

        // รอ animation เสร็จแล้วค่อย callback
        setTimeout(() => {
            onCardSelect(index);
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            padding: '40px 20px',
            width: '100%',
            overflow: 'hidden'
        }}>
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
                
                <AnimatePresence mode="popLayout">
                    {visibleCards.map((card, index) => {
                        const { x, y, rotation, isOuterRing } = getCirclePosition(index);
                        const isHovered = hoveredIndex === index;
                        const isPicking = pickingIndex === index;
                        // วงนอกใหญ่กว่าวงในเล็กน้อย
                        const cardScale = isOuterRing ? 0.75 : 0.65;

                        return (
                            <motion.div
                                key={card.id}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    x: 0,
                                    y: 0
                                }}
                                animate={{
                                    opacity: isPicking ? 0 : 1,
                                    scale: isHovered ? cardScale * 1.15 : cardScale, // ขยาย 15% เมื่อ hover
                                    rotate: rotation,
                                    x: x,
                                    y: y,
                                    z: isHovered ? 60 : 0,
                                    // z-index: ไพ่ที่ hover อยู่ด้านบนสุด, ไพ่อื่นๆ เรียงตามลำดับ
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.3,
                                    x: 0,
                                    y: 0,
                                    transition: { 
                                        duration: 0.6,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 280,
                                    damping: 22,
                                    delay: index * 0.05
                                }}
                                whileHover={{
                                    scale: cardScale * 1.15, // ขยาย 15% จากขนาดปกติ
                                    z: 60,
                                    transition: { duration: 0.2 }
                                }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onClick={() => handleCardClick(index)}
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
                <div style={{
                    color: 'var(--cosmic-lavender)',
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    fontStyle: 'italic'
                }}>
                    (วงนอก {outerRingCount} ใบ | วงใน {innerRingCount} ใบ | รวม {totalCards} ใบ)
                </div>
            </motion.div>

            {/* Card Counter */}
            <div style={{
                fontFamily: 'var(--font-thai)',
                color: 'var(--cosmic-light-purple)',
                fontSize: '0.95rem',
                textAlign: 'center',
                opacity: 0.8
            }}>
                เหลือไพ่ {cards.length} ใบ
            </div>
        </div>
    );
}
