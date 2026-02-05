// Tarot Card Types

export type CardSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export type CardPosition = 'upright' | 'reversed';

export interface TarotCard {
    id: string;
    name: string;
    nameThai: string;
    suit: CardSuit;
    number?: number; // For numbered cards (1-14), undefined for Major Arcana by name
    arcana: 'major' | 'minor';
    imageUrl: string;
    keywords: {
        upright: string[];
        reversed: string[];
    };
    meaning: {
        upright: string;
        reversed: string;
    };
    description: string;
}

export interface DrawnCard {
    card: TarotCard;
    position: CardPosition;
    spreadPosition: number; // Position in the spread (0-indexed)
}

export type SpreadType =
    | 'single'           // 1 card - Daily reading
    | 'two-choices'      // 2 cards - Choice A vs B
    | 'past-present-future' // 3 cards
    | 'situation-challenge-advice' // 3 cards
    | 'horseshoe'        // 5 cards
    | 'chakra'           // 7 cards
    | 'celtic-cross'     // 10 cards
    | 'astrological';    // 21 cards

export interface SpreadPosition {
    index: number;
    label: string;
    labelThai: string;
    description: string;
    x: number; // Relative position for layout (percentage)
    y: number; // Relative position for layout (percentage)
    rotation?: number; // Optional rotation in degrees
}

export interface SpreadConfig {
    type: SpreadType;
    name: string;
    nameThai: string;
    description: string;
    descriptionThai: string;
    cardCount: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    positions: SpreadPosition[];
    icon?: string; // Emoji or icon identifier
}

export interface Reading {
    id: string;
    userId?: string;
    spreadType: SpreadType;
    question?: string;
    drawnCards: DrawnCard[];
    interpretation?: string;
    createdAt: Date;
    isFavorite?: boolean;
}

export interface DeckState {
    cards: TarotCard[];
    isShuffled: boolean;
    isCut: boolean;
    remainingCards: TarotCard[];
}

export interface ReadingSession {
    spreadConfig: SpreadConfig;
    question?: string;
    deckState: DeckState;
    drawnCards: DrawnCard[];
    currentStep: 'select-spread' | 'ask-question' | 'shuffle' | 'cut' | 'draw' | 'reveal' | 'interpret';
}
