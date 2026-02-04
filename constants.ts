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
  { name: "The Fool", image: "https://picsum.photos/200/300", keywords: ["New Beginnings", "Innocence", "Spontaneity"] },
  { name: "The Magician", image: "https://picsum.photos/200/301", keywords: ["Manifestation", "Power", "Resourcefulness"] },
  { name: "The High Priestess", image: "https://picsum.photos/200/302", keywords: ["Intuition", "Unconscious", "Mystery"] },
  { name: "The Empress", image: "https://picsum.photos/200/303", keywords: ["Femininity", "Nature", "Nurturing"] },
  { name: "The Emperor", image: "https://picsum.photos/200/304", keywords: ["Authority", "Structure", "Control"] },
  { name: "The Hierophant", image: "https://picsum.photos/200/305", keywords: ["Tradition", "Conformity", "Morality"] },
  { name: "The Lovers", image: "https://picsum.photos/200/306", keywords: ["Love", "Harmony", "Relationships"] },
  { name: "The Chariot", image: "https://picsum.photos/200/307", keywords: ["Control", "Willpower", "Victory"] },
  { name: "Strength", image: "https://picsum.photos/200/308", keywords: ["Strength", "Courage", "Persuasion"] },
  { name: "The Hermit", image: "https://picsum.photos/200/309", keywords: ["Soul-searching", "Introspection", "Being Alone"] },
  { name: "Wheel of Fortune", image: "https://picsum.photos/200/310", keywords: ["Good Luck", "Karma", "Life Cycles"] },
  { name: "Justice", image: "https://picsum.photos/200/311", keywords: ["Justice", "Fairness", "Truth"] },
  { name: "The Hanged Man", image: "https://picsum.photos/200/312", keywords: ["Pause", "Surrender", "New Perspective"] },
  { name: "Death", image: "https://picsum.photos/200/313", keywords: ["Endings", "Change", "Transformation"] },
  { name: "Temperance", image: "https://picsum.photos/200/314", keywords: ["Balance", "Moderation", "Patience"] },
  { name: "The Devil", image: "https://picsum.photos/200/315", keywords: ["Shadow Self", "Attachment", "Restriction"] },
  { name: "The Tower", image: "https://picsum.photos/200/316", keywords: ["Sudden Change", "Upheaval", "Chaos"] },
  { name: "The Star", image: "https://picsum.photos/200/317", keywords: ["Hope", "Faith", "Purpose"] },
  { name: "The Moon", image: "https://picsum.photos/200/318", keywords: ["Illusion", "Fear", "Anxiety"] },
  { name: "The Sun", image: "https://picsum.photos/200/319", keywords: ["Positivity", "Fun", "Warmth"] },
  { name: "Judgement", image: "https://picsum.photos/200/320", keywords: ["Judgement", "Rebirth", "Inner Calling"] },
  { name: "The World", image: "https://picsum.photos/200/321", keywords: ["Completion", "Integration", "Accomplishment"] },
];