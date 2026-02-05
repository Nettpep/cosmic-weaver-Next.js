'use client';

import React, { useState } from 'react';
import { SpreadConfig } from '@/types/tarot';
import { useTarotStore } from '@/store/tarotStore';
import CardDeck from './CardDeck';
import SpreadLayout from './SpreadLayout';
import '@/styles/tarot.css';

interface ReadingSessionProps {
    spread: SpreadConfig;
    onComplete?: () => void;
    onCancel?: () => void;
}

export default function ReadingSession({ spread, onComplete, onCancel }: ReadingSessionProps) {
    const {
        currentSession,
        setQuestion,
        shuffleDeck,
        cutDeck,
        drawCard,
        saveReading,
        setCurrentStep,
        resetSession
    } = useTarotStore();

    const [questionInput, setQuestionInput] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);

    if (!currentSession) {
        return null;
    }

    const { currentStep, deckState, drawnCards } = currentSession;

    const handleAskQuestion = () => {
        if (questionInput.trim()) {
            setQuestion(questionInput);
        }
        setCurrentStep('shuffle');
    };

    const handleShuffle = () => {
        setIsShuffling(true);
        setTimeout(() => {
            shuffleDeck();
            setIsShuffling(false);
        }, 1000);
    };

    const handleCut = (position: number) => {
        cutDeck(position);
    };

    const handleDrawCard = () => {
        const drawn = drawCard();
        if (drawn && drawnCards.length + 1 >= spread.cardCount) {
            setTimeout(() => setCurrentStep('reveal'), 500);
        }
    };

    const handleSaveReading = () => {
        saveReading();
        if (onComplete) {
            onComplete();
        }
    };

    const handleCancel = () => {
        resetSession();
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="tarot-container" style={{ minHeight: '100vh', padding: '40px 20px' }}>
            {/* Stars Background */}
            <div className="stars-background">
                {Array.from({ length: 50 }).map((_, i) => (
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

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header with Cancel Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 className="mystical-title" style={{ fontSize: '2.5rem', margin: 0 }}>
                        {spread.nameThai}
                    </h1>
                    <button
                        className="glass-button"
                        onClick={handleCancel}
                        style={{ padding: '12px 24px' }}
                    >
                        ยกเลิก
                    </button>
                </div>

                {/* Step: Ask Question */}
                {currentStep === 'ask-question' && (
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        <h2 className="thai-title" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>
                            🔮 ตั้งคำถามของคุณ
                        </h2>
                        <p className="thai-body" style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                            ระบุคำถามหรือสิ่งที่คุณต้องการคำแนะนำ (ไม่บังคับ)
                        </p>

                        <textarea
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                            placeholder="เช่น: ฉันควรทำอย่างไรกับความสัมพันธ์นี้?"
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontFamily: 'var(--font-thai)',
                                fontSize: '1.1rem',
                                resize: 'vertical',
                                marginBottom: '24px'
                            }}
                        />

                        <button
                            className="glass-button glass-button-gold"
                            onClick={handleAskQuestion}
                            style={{ fontSize: '1.2rem', padding: '16px 48px' }}
                        >
                            ต่อไป →
                        </button>
                    </div>
                )}

                {/* Step: Shuffle */}
                {currentStep === 'shuffle' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="thai-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
                            🔀 สับไพ่
                        </h2>
                        <p className="thai-body" style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
                            จดจ่อกับคำถามของคุณ แล้วคลิกเพื่อสับไพ่
                        </p>

                        <CardDeck
                            cards={deckState.cards}
                            onShuffle={handleShuffle}
                            isShuffling={isShuffling}
                            size="medium"
                        />
                    </div>
                )}

                {/* Step: Cut */}
                {currentStep === 'cut' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="thai-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
                            ✂️ ตัดไพ่
                        </h2>
                        <p className="thai-body" style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
                            คลิกเพื่อตัดสำรับไพ่
                        </p>

                        <CardDeck
                            cards={deckState.remainingCards}
                            onCut={handleCut}
                            size="medium"
                        />
                    </div>
                )}

                {/* Step: Draw */}
                {currentStep === 'draw' && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 className="thai-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
                                👆 จั่วไพ่
                            </h2>
                            <p className="thai-body" style={{ fontSize: '1.1rem' }}>
                                คลิกที่สำรับไพ่เพื่อจั่วไพ่ใบต่อไป
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '60px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            {/* Deck */}
                            <div>
                                <CardDeck
                                    cards={deckState.remainingCards}
                                    onCardDraw={handleDrawCard}
                                    size="medium"
                                />
                            </div>

                            {/* Spread Preview */}
                            <div style={{ flex: 1, minWidth: '400px' }}>
                                <SpreadLayout
                                    spread={spread}
                                    drawnCards={drawnCards}
                                    animateReveal={true}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step: Reveal & Interpret */}
                {(currentStep === 'reveal' || currentStep === 'interpret') && (
                    <div>
                        <SpreadLayout
                            spread={spread}
                            drawnCards={drawnCards}
                            showCardDetails={true}
                            animateReveal={currentStep === 'reveal'}
                        />

                        {/* Interpretation Section */}
                        <div style={{
                            maxWidth: '800px',
                            margin: '60px auto 0',
                            background: 'var(--gradient-glass)',
                            backdropFilter: 'blur(15px)',
                            border: '2px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '32px'
                        }}>
                            <h3 className="thai-title" style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>
                                📖 การตีความหมายไพ่
                            </h3>

                            {drawnCards.map((drawnCard, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: '24px',
                                        paddingBottom: '24px',
                                        borderBottom: index < drawnCards.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <span style={{
                                            background: 'var(--gradient-gold)',
                                            color: 'var(--cosmic-deep-purple)',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '0.9rem'
                                        }}>
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h4 style={{
                                                fontFamily: 'var(--font-thai-display)',
                                                color: 'var(--cosmic-gold)',
                                                fontSize: '1.1rem',
                                                marginBottom: '2px'
                                            }}>
                                                {spread.positions[index].labelThai}
                                            </h4>
                                            <p style={{
                                                fontFamily: 'var(--font-elegant)',
                                                color: 'var(--cosmic-lavender)',
                                                fontSize: '0.85rem',
                                                fontStyle: 'italic'
                                            }}>
                                                {drawnCard.card.nameThai} ({drawnCard.position === 'upright' ? 'คว่ำ' : 'หงาย'})
                                            </p>
                                        </div>
                                    </div>

                                    <p className="thai-body" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                                        {drawnCard.position === 'upright'
                                            ? drawnCard.card.meaning.upright
                                            : drawnCard.card.meaning.reversed}
                                    </p>
                                </div>
                            ))}

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
                                <button
                                    className="glass-button glass-button-gold"
                                    onClick={handleSaveReading}
                                    style={{ fontSize: '1.1rem' }}
                                >
                                    ✨ บันทึกผลการดูดวง
                                </button>
                                <button
                                    className="glass-button"
                                    onClick={handleCancel}
                                >
                                    ดูดวงใหม่
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Indicator */}
                <div style={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                    {['ask-question', 'shuffle', 'cut', 'draw', 'reveal'].map((step, index) => (
                        <div
                            key={step}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: currentStep === step || index < ['ask-question', 'shuffle', 'cut', 'draw', 'reveal'].indexOf(currentStep)
                                    ? 'var(--cosmic-gold)'
                                    : 'rgba(255, 255, 255, 0.3)',
                                boxShadow: currentStep === step ? 'var(--glow-gold)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
