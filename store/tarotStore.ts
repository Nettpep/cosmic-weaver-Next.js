import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TarotCard, DrawnCard, SpreadConfig, Reading, DeckState, ReadingSession, CardPosition } from '@/types/tarot';
import fullDeck from '@/data/tarotData';

interface TarotStore {
    // Reading session
    currentSession: ReadingSession | null;

    // Reading history
    readings: Reading[];
    dailyReading: Reading | null;
    lastDailyReadingDate: string | null;
    readingStreak: number;

    // Actions
    startReading: (spreadConfig: SpreadConfig, question?: string) => void;
    setQuestion: (question: string) => void;
    shuffleDeck: () => void;
    cutDeck: (position: number) => void;
    drawCard: (cardId?: string) => DrawnCard | null;
    drawCards: (count: number) => DrawnCard[];
    revealCard: (index: number) => void;
    saveReading: (interpretation?: string) => void;
    getDailyReading: () => Reading | null;
    setCurrentStep: (step: ReadingSession['currentStep']) => void;
    resetSession: () => void;
    toggleFavorite: (readingId: string) => void;
    deleteReading: (readingId: string) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const getRandomPosition = (): CardPosition => {
    return Math.random() > 0.5 ? 'upright' : 'reversed';
};

export const useTarotStore = create<TarotStore>()(
    persist(
        (set, get) => ({
            currentSession: null,
            readings: [],
            dailyReading: null,
            lastDailyReadingDate: null,
            readingStreak: 0,

            startReading: (spreadConfig: SpreadConfig, question?: string) => {
                // ตรวจสอบและจำกัด deck ให้มีแค่ 78 ใบ (ป้องกันไพ่ซ้ำ)
                const cleanDeck = fullDeck.slice(0, 78);
                const shuffledDeck = shuffleArray(cleanDeck);

                set({
                    currentSession: {
                        spreadConfig,
                        question,
                        deckState: {
                            cards: shuffledDeck,
                            isShuffled: false,
                            isCut: false,
                            remainingCards: shuffledDeck
                        },
                        drawnCards: [],
                        currentStep: 'ask-question'
                    }
                });
            },

            setQuestion: (question: string) => {
                const { currentSession } = get();
                if (currentSession) {
                    set({
                        currentSession: {
                            ...currentSession,
                            question
                        }
                    });
                }
            },

            shuffleDeck: () => {
                const { currentSession } = get();
                if (!currentSession) return;

                // จำกัดไม่ให้เกิน 78 ใบ (ป้องกันไพ่ซ้ำ)
                const cleanCards = currentSession.deckState.cards.slice(0, 78);
                const shuffled = shuffleArray(cleanCards);

                set({
                    currentSession: {
                        ...currentSession,
                        deckState: {
                            ...currentSession.deckState,
                            cards: shuffled,
                            remainingCards: shuffled,
                            isShuffled: true
                        },
                        currentStep: 'cut'
                    }
                });
            },

            cutDeck: (position: number) => {
                const { currentSession } = get();
                if (!currentSession || !currentSession.deckState.isShuffled) return;

                // จำกัดไม่ให้เกิน 78 ใบ (ป้องกันไพ่ซ้ำ)
                const { cards } = currentSession.deckState;
                const cleanCards = cards.slice(0, 78);
                const cutCards = [...cleanCards.slice(position), ...cleanCards.slice(0, position)];

                set({
                    currentSession: {
                        ...currentSession,
                        deckState: {
                            ...currentSession.deckState,
                            cards: cutCards,
                            remainingCards: cutCards,
                            isCut: true
                        },
                        currentStep: 'draw'
                    }
                });
            },

            drawCard: (cardId?: string) => {
                const { currentSession } = get();
                if (!currentSession || currentSession.deckState.remainingCards.length === 0) {
                    return null;
                }

                let card;
                let remaining: typeof currentSession.deckState.remainingCards;

                // ถ้ามี cardId ให้จั่วไพ่ที่ตรงกับ cardId
                if (cardId) {
                    const cardIndex = currentSession.deckState.remainingCards.findIndex(c => c.id === cardId);
                    if (cardIndex === -1) {
                        // ถ้าไม่เจอ ให้จั่วไพ่ใบแรกแทน
                        [card, ...remaining] = currentSession.deckState.remainingCards;
                    } else {
                        card = currentSession.deckState.remainingCards[cardIndex];
                        remaining = currentSession.deckState.remainingCards.filter((_, i) => i !== cardIndex);
                    }
                } else {
                    // ถ้าไม่มี cardId ให้จั่วไพ่ใบแรก (เดิม)
                    [card, ...remaining] = currentSession.deckState.remainingCards;
                }

                const drawnCard: DrawnCard = {
                    card,
                    position: getRandomPosition(),
                    spreadPosition: currentSession.drawnCards.length
                };

                set({
                    currentSession: {
                        ...currentSession,
                        deckState: {
                            ...currentSession.deckState,
                            remainingCards: remaining
                        },
                        drawnCards: [...currentSession.drawnCards, drawnCard],
                        currentStep: currentSession.drawnCards.length + 1 >= currentSession.spreadConfig.cardCount ? 'reveal' : 'draw'
                    }
                });

                return drawnCard;
            },

            drawCards: (count: number) => {
                const drawn: DrawnCard[] = [];
                for (let i = 0; i < count; i++) {
                    const card = get().drawCard();
                    if (card) drawn.push(card);
                }
                return drawn;
            },

            revealCard: (index: number) => {
                // For animation purposes - mark card as revealed
                const { currentSession } = get();
                if (currentSession && currentSession.drawnCards[index]) {
                    set({
                        currentSession: {
                            ...currentSession,
                            currentStep: 'interpret'
                        }
                    });
                }
            },

            saveReading: (interpretation?: string) => {
                const { currentSession, readings, lastDailyReadingDate, readingStreak } = get();
                if (!currentSession) return;

                const today = new Date().toISOString().split('T')[0];
                const isDaily = currentSession.spreadConfig.type === 'single';

                const reading: Reading = {
                    id: `reading-${Date.now()}`,
                    spreadType: currentSession.spreadConfig.type,
                    question: currentSession.question,
                    drawnCards: currentSession.drawnCards,
                    interpretation,
                    createdAt: new Date(),
                    isFavorite: false
                };

                let newStreak = readingStreak;
                if (isDaily) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (lastDailyReadingDate === yesterdayStr) {
                        newStreak += 1;
                    } else if (lastDailyReadingDate !== today) {
                        newStreak = 1;
                    }
                }

                set({
                    readings: [reading, ...readings],
                    dailyReading: isDaily ? reading : get().dailyReading,
                    lastDailyReadingDate: isDaily ? today : lastDailyReadingDate,
                    readingStreak: newStreak,
                    currentSession: null
                });
            },

            getDailyReading: () => {
                const { dailyReading, lastDailyReadingDate } = get();
                const today = new Date().toISOString().split('T')[0];

                if (lastDailyReadingDate === today && dailyReading) {
                    return dailyReading;
                }

                return null;
            },

            setCurrentStep: (step: ReadingSession['currentStep']) => {
                const { currentSession } = get();
                if (currentSession) {
                    set({
                        currentSession: {
                            ...currentSession,
                            currentStep: step
                        }
                    });
                }
            },

            resetSession: () => {
                set({ currentSession: null });
            },

            toggleFavorite: (readingId: string) => {
                set({
                    readings: get().readings.map(r =>
                        r.id === readingId ? { ...r, isFavorite: !r.isFavorite } : r
                    )
                });
            },

            deleteReading: (readingId: string) => {
                set({
                    readings: get().readings.filter(r => r.id !== readingId)
                });
            }
        }),
        {
            name: 'tarot-storage',
            partialize: (state) => ({
                readings: state.readings,
                dailyReading: state.dailyReading,
                lastDailyReadingDate: state.lastDailyReadingDate,
                readingStreak: state.readingStreak
            })
        }
    )
);
