// Helper to get extended tarot card meanings from TypeScript data
// This bridges the detailed tarot meanings data with our React components

import { tarotMeaningsData, type TarotMeaningData } from '@/data/tarotMeaningsData';

export interface ExtendedMeaning {
    keywords: string;
    meaning_up: string;
    meaning_rev: string;
    code_meaning: string;
}

// Card name mapping: our TarotCard.name to tarotMeaningsData array index
const CARD_NAME_TO_INDEX: Record<string, number> = {
    'The Fool': 0,
    'The Magician': 1,
    'The High Priestess': 2,
    'The Empress': 3,
    'The Emperor': 4,
    'The Hierophant': 5,
    'The Lovers': 6,
    'The Chariot': 7,
    'Strength': 8,
    'The Hermit': 9,
    'Wheel of Fortune': 10,
    'Justice': 11,
    'The Hanged Man': 12,
    'Death': 13,
    'Temperance': 14,
    'The Devil': 15,
    'The Tower': 16,
    'The Star': 17,
    'The Moon': 18,
    'The Sun': 19,
    'Judgement': 20,
    'The World': 21,
    'Ace of Wands': 22,
    'Two of Wands': 23,
    'Three of Wands': 24,
    'Four of Wands': 25,
    'Five of Wands': 26,
    'Six of Wands': 27,
    'Seven of Wands': 28,
    'Eight of Wands': 29,
    'Nine of Wands': 30,
    'Ten of Wands': 31,
    'Page of Wands': 32,
    'Knight of Wands': 33,
    'Queen of Wands': 34,
    'King of Wands': 35,
    'Ace of Cups': 36,
    'Two of Cups': 37,
    'Three of Cups': 38,
    'Four of Cups': 39,
    'Five of Cups': 40,
    'Six of Cups': 41,
    'Seven of Cups': 42,
    'Eight of Cups': 43,
    'Nine of Cups': 44,
    'Ten of Cups': 45,
    'Page of Cups': 46,
    'Knight of Cups': 47,
    'Queen of Cups': 48,
    'King of Cups': 49,
    'Ace of Swords': 50,
    'Two of Swords': 51,
    'Three of Swords': 52,
    'Four of Swords': 53,
    'Five of Swords': 54,
    'Six of Swords': 55,
    'Seven of Swords': 56,
    'Eight of Swords': 57,
    'Nine of Swords': 58,
    'Ten of Swords': 59,
    'Page of Swords': 60,
    'Knight of Swords': 61,
    'Queen of Swords': 62,
    'King of Swords': 63,
    'Ace of Pentacles': 64,
    'Two of Pentacles': 65,
    'Three of Pentacles': 66,
    'Four of Pentacles': 67,
    'Five of Pentacles': 68,
    'Six of Pentacles': 69,
    'Seven of Pentacles': 70,
    'Eight of Pentacles': 71,
    'Nine of Pentacles': 72,
    'Ten of Pentacles': 73,
    'Page of Pentacles': 74,
    'Knight of Pentacles': 75,
    'Queen of Pentacles': 76,
    'King of Pentacles': 77
};

export function getExtendedMeaning(cardName: string): ExtendedMeaning | null {
    const index = CARD_NAME_TO_INDEX[cardName];
    if (index === undefined) return null;

    const data: TarotMeaningData | undefined = tarotMeaningsData[index];
    if (!data) return null;

    return {
        keywords: data.keywords || '',
        meaning_up: data.meaning_up || '',
        meaning_rev: data.meaning_rev || '',
        code_meaning: data.code_meaning || ''
    };
}
