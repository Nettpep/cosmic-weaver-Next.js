'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/types/tarot';
import '@/styles/tarot.css';

interface AnimatedCardDeckProps {
    cards: TarotCardType[];
    onShuffle?: () => void;
    onCut?: () => void;
    size?: 'small' | 'medium' | 'large';
}

type ShuffleState = 'idle' | 'splitting' | 'riffling' | 'merging';
type CutState = 'idle' | 'splitting' | 'selecting' | 'merging';

/**
 * AnimatedCardDeck - สับและตัดไพ่แบบสมจริง
 * - Riffle Shuffle: แบ่ง 2 กอง กรีดสลับกัน
 * - Three-Pile Cut: แยก 3 กอง เลือกลำดับ
 */
export default function AnimatedCardDeck({
    cards,
    onShuffle,
    onCut,
    size = 'medium'
}: AnimatedCardDeckProps) {
    const [shuffleState, setShuffleState] = useState<ShuffleState>('idle');
    const [cutState, setCutState] = useState<CutState>('idle');
    const [cutPiles, setCutPiles] = useState<number[]>([]);

    // สับไพ่แบบ Riffle Shuffle
    const handleRiffleShuffle = async () => {
        if (!onShuffle) return;

        // Step 1: แบ่งกอง
        setShuffleState('splitting');
        await delay(600);

        // Step 2: กรีดสลับกัน
        setShuffleState('riffling');
        await delay(1200);

        // Step 3: รวมกลับ
        setShuffleState('merging');
        await delay(600);

        // เรียก callback
        onShuffle();
        setShuffleState('idle');
    };

    // ตัดไพ่แบบ Three-Pile Cut
    const handleThreePileCut = async () => {
        if (!onCut) return;

        // Step 1: แยกเป็น 3 กอง
        setCutState('splitting');
        await delay(800);

        // Step 2: ให้เลือกลำดับ
        setCutState('selecting');
        setCutPiles([]);
    };

    const handlePileSelect = async (pileIndex: number) => {
        const newPiles = [...cutPiles, pileIndex];
        setCutPiles(newPiles);

        // เมื่อเลือกครบ 3 กอง
        if (newPiles.length === 3) {
            await delay(400);
            setCutState('merging');
            await delay(800);

            // เรียก callback
            if (onCut) onCut();
            setCutState('idle');
            setCutPiles([]);
        }
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // แสดงไพ่ตัวอย่าง
    const visibleCards = cards.slice(0, 10);
    const midPoint = Math.floor(visibleCards.length / 2);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            padding: '20px',
            minHeight: '600px',
            width: '100%'
        }}>
            {/* Shuffle Animation Area */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                height: '280px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '60px'
            }}>
                {shuffleState === 'idle' && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            position: 'relative',
                            width: '180px',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {visibleCards.slice(0, 5).map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ rotate: 0 }}
                                animate={{
                                    rotate: (Math.random() - 0.5) * 4,
                                    y: index * -2,
                                    zIndex: index
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
                                }}
                            >
                                <TarotCard
                                    card={card}
                                    showBack={true}
                                    size={size}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Riffle Shuffle Animation */}
                {shuffleState !== 'idle' && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: shuffleState === 'splitting' ? '100px' : '20px',
                        transition: 'gap 0.6s ease',
                        width: '100%',
                        height: '100%'
                    }}>
                        {/* กองซ้าย */}
                        <div style={{ 
                            position: 'relative',
                            width: '180px',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {visibleCards.slice(0, midPoint).map((card, index) => (
                                <motion.div
                                    key={`left-${card.id}`}
                                    initial={{ x: 0, y: 0, rotate: 0 }}
                                    animate={{
                                        x: shuffleState === 'splitting' ? -50 : 
                                           shuffleState === 'riffling' ? -10 : 0,
                                        y: shuffleState === 'riffling' ? index * -4 : index * -2,
                                        rotate: shuffleState === 'splitting' ? -15 :
                                                shuffleState === 'riffling' ? -8 : 0,
                                        zIndex: shuffleState === 'riffling' ? index * 2 : index
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 20,
                                        delay: shuffleState === 'riffling' ? index * 0.05 : 0
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4))'
                                    }}
                                >
                                    <TarotCard card={card} showBack={true} size={size} />
                                </motion.div>
                            ))}
                        </div>

                        {/* กองขวา */}
                        <div style={{ 
                            position: 'relative',
                            width: '180px',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {visibleCards.slice(midPoint).map((card, index) => (
                                <motion.div
                                    key={`right-${card.id}`}
                                    initial={{ x: 0, y: 0, rotate: 0 }}
                                    animate={{
                                        x: shuffleState === 'splitting' ? 50 : 
                                           shuffleState === 'riffling' ? 10 : 0,
                                        y: shuffleState === 'riffling' ? index * -4 : index * -2,
                                        rotate: shuffleState === 'splitting' ? 15 :
                                                shuffleState === 'riffling' ? 8 : 0,
                                        zIndex: shuffleState === 'riffling' ? index * 2 + 1 : index
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 20,
                                        delay: shuffleState === 'riffling' ? index * 0.05 : 0
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4))'
                                    }}
                                >
                                    <TarotCard card={card} showBack={true} size={size} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Cut Animation Area */}
            {cutState !== 'idle' && (
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '250px',
                    marginBottom: '40px',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {[0, 1, 2].map((pileIndex) => {
                        const isSelected = cutPiles.includes(pileIndex);
                        const selectionOrder = cutPiles.indexOf(pileIndex);

                        return (
                            <motion.div
                                key={pileIndex}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{
                                    y: cutState === 'splitting' ? 0 : -20,
                                    opacity: 1,
                                    scale: isSelected ? 0.9 : 1
                                }}
                                transition={{
                                    type: 'spring',
                                    delay: pileIndex * 0.15,
                                    stiffness: 150,
                                    damping: 15
                                }}
                                onClick={() => cutState === 'selecting' && !isSelected && handlePileSelect(pileIndex)}
                                style={{
                                    position: 'relative',
                                    cursor: cutState === 'selecting' && !isSelected ? 'pointer' : 'default',
                                    filter: isSelected ? 'brightness(0.7)' : 'brightness(1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                {/* กองไพ่ */}
                                <div style={{ 
                                    position: 'relative',
                                    width: '140px',
                                    height: '233px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {visibleCards.slice(0, 3).map((card, cardIndex) => (
                                        <motion.div
                                            key={`pile-${pileIndex}-${cardIndex}`}
                                            style={{
                                                position: 'absolute',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                top: cardIndex * -2,
                                                filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.4))'
                                            }}
                                        >
                                            <TarotCard card={card} showBack={true} size="small" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* ตัวเลขลำดับ */}
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{
                                            position: 'absolute',
                                            top: '-40px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'var(--gradient-gold)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: 'var(--cosmic-deep-purple)',
                                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                                        }}
                                    >
                                        {selectionOrder + 1}
                                    </motion.div>
                                )}

                                {/* คำแนะนำ */}
                                {cutState === 'selecting' && !isSelected && (
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: '-35px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            whiteSpace: 'nowrap',
                                            color: 'var(--cosmic-gold)',
                                            fontSize: '0.9rem',
                                            fontFamily: 'var(--font-thai)'
                                        }}
                                    >
                                        คลิกเลือก
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 'auto',
                paddingTop: '40px',
                width: '100%',
                position: 'relative',
                zIndex: 100
            }}>
                {onShuffle && cutState === 'idle' && (
                    <motion.button
                        className="glass-button"
                        onClick={handleRiffleShuffle}
                        disabled={shuffleState !== 'idle'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: shuffleState !== 'idle' ? 0.5 : 1
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>🔀</span>
                        <span>{shuffleState === 'idle' ? 'สับไพ่แบบกรีด' : 'กำลังสับ...'}</span>
                    </motion.button>
                )}

                {onCut && shuffleState === 'idle' && (
                    <motion.button
                        className="glass-button glass-button-gold"
                        onClick={handleThreePileCut}
                        disabled={cutState !== 'idle'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: cutState !== 'idle' ? 0.5 : 1
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>✂️</span>
                        <span>{cutState === 'idle' ? 'ตัดไพ่ 3 กอง' : 
                               cutState === 'selecting' ? `เลือก ${3 - cutPiles.length} กอง` : 
                               'กำลังตัด...'}</span>
                    </motion.button>
                )}
            </div>

            {/* Card Count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                style={{
                    fontFamily: 'var(--font-thai)',
                    color: 'var(--cosmic-light-purple)',
                    fontSize: '1rem',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 100,
                    paddingTop: '10px'
                }}
            >
                💫 สำรับไพ่ {cards.length} ใบ
            </motion.div>
        </div>
    );
}
