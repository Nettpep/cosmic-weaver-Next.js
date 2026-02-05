import { BlogPost, BlogPostCategory, TarotCard } from './types';

export const APP_NAME = "The Cosmic Weaver";

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "The Hum of the Void: What Listening Tells Us",
    excerpt: "Scientists have detected a low-frequency hum permeating the cosmos. Is it the background radiation, or the breathing of a living universe?",
    content: "Content about the void...",
    category: BlogPostCategory.UNIVERSE_SECRETS,
    watcherInsight: "The silence is not empty; it is full of answers waiting for the right question.",
    imageUrl: "https://picsum.photos/800/400?grayscale",
    date: "2023-10-27"
  },
  {
    id: '2',
    title: "Synchronicity or Simulation?",
    excerpt: "When numbers align and déjà vu strikes, are we seeing the code of the Matrix or the threads of Fate being pulled?",
    content: "Content about simulation theory...",
    category: BlogPostCategory.UNSOLVED_MYSTERIES,
    watcherInsight: "Coincidence is merely a pattern you haven't zoomed out far enough to see.",
    imageUrl: "https://picsum.photos/800/401?grayscale",
    date: "2023-10-25"
  },
  {
    id: '3',
    title: "Manifesting with Starlight",
    excerpt: "Harnessing the ancient energy of distant suns to align your personal frequency with abundance.",
    content: "Content about energy work...",
    category: BlogPostCategory.ENERGY_MANIFESTATION,
    watcherInsight: "You are made of starstuff; calling upon the stars is simply calling home.",
    imageUrl: "https://picsum.photos/800/402?grayscale",
    date: "2023-10-20"
  }
];

export const MAJOR_ARCANA: TarotCard[] = [
  { name: "The Fool",        image: "/images/card_0.jpg",  keywords: ["New Beginnings", "Innocence", "Spontaneity"] },
  { name: "The Magician",    image: "/images/card_1.jpg",  keywords: ["Manifestation", "Power", "Resourcefulness"] },
  { name: "The High Priestess", image: "/images/card_2.jpg", keywords: ["Intuition", "Unconscious", "Mystery"] },
  { name: "The Empress",     image: "/images/card_3.jpg",  keywords: ["Femininity", "Nature", "Nurturing"] },
  { name: "The Emperor",     image: "/images/card_4.jpg",  keywords: ["Authority", "Structure", "Control"] },
  { name: "The Hierophant",  image: "/images/card_5.jpg",  keywords: ["Tradition", "Conformity", "Morality"] },
  { name: "The Lovers",      image: "/images/card_6.jpg",  keywords: ["Love", "Harmony", "Relationships"] },
  { name: "The Chariot",     image: "/images/card_7.jpg",  keywords: ["Control", "Willpower", "Victory"] },
  { name: "Strength",        image: "/images/card_8.jpg",  keywords: ["Strength", "Courage", "Persuasion"] },
  { name: "The Hermit",      image: "/images/card_9.jpg",  keywords: ["Soul-searching", "Introspection", "Being Alone"] },
  { name: "Wheel of Fortune",image: "/images/card_10.jpg", keywords: ["Good Luck", "Karma", "Life Cycles"] },
  { name: "Justice",         image: "/images/card_11.jpg", keywords: ["Justice", "Fairness", "Truth"] },
  { name: "The Hanged Man",  image: "/images/card_12.jpg", keywords: ["Pause", "Surrender", "New Perspective"] },
  { name: "Death",           image: "/images/card_13.jpg", keywords: ["Endings", "Change", "Transformation"] },
  { name: "Temperance",      image: "/images/card_14.jpg", keywords: ["Balance", "Moderation", "Patience"] },
  { name: "The Devil",       image: "/images/card_15.jpg", keywords: ["Shadow Self", "Attachment", "Restriction"] },
  { name: "The Tower",       image: "/images/card_16.jpg", keywords: ["Sudden Change", "Upheaval", "Chaos"] },
  { name: "The Star",        image: "/images/card_17.jpg", keywords: ["Hope", "Faith", "Purpose"] },
  { name: "The Moon",        image: "/images/card_18.jpg", keywords: ["Illusion", "Fear", "Anxiety"] },
  { name: "The Sun",         image: "/images/card_19.jpg", keywords: ["Positivity", "Fun", "Warmth"] },
  { name: "Judgement",       image: "/images/card_20.jpg", keywords: ["Judgement", "Rebirth", "Inner Calling"] },
  { name: "The World",       image: "/images/card_21.jpg", keywords: ["Completion", "Integration", "Accomplishment"] },
];