import { BlogPost, BlogPostCategory, TarotCard } from './types';

export const APP_NAME = "The Cosmic Weaver";

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "เสียงกระซิบจากความว่างเปล่า: เมื่อจักรวาลพูดกับเรา",
    excerpt: "นักวิทยาศาสตร์ค้นพบเสียงความถี่ต่ำที่แผ่ซ่านไปทั่วจักรวาล มันคือรังสีพื้นหลังของจักรวาล หรือเป็นลมหายใจของจักรวาลที่มีชีวิต?",
    content: "เนื้อหาเกี่ยวกับความว่างเปล่าและความลึกลับของจักรวาล...",
    category: BlogPostCategory.UNIVERSE_SECRETS,
    watcherInsight: "ความเงียบไม่ได้ว่างเปล่า มันเต็มไปด้วยคำตอบที่รอคำถามที่ถูกต้อง",
    imageUrl: "https://picsum.photos/800/400?grayscale",
    date: "2023-10-27"
  },
  {
    id: '2',
    title: "ความบังเอิญหรือโลกจำลอง?",
    excerpt: "เมื่อตัวเลขเรียงตัวตรงกันและเดจาวูเกิดขึ้น เรากำลังเห็นรหัสของ Matrix หรือเส้นด้ายแห่งโชคชะตากำลังถูกดึง?",
    content: "เนื้อหาเกี่ยวกับทฤษฎีโลกจำลอง...",
    category: BlogPostCategory.UNSOLVED_MYSTERIES,
    watcherInsight: "ความบังเอิญเป็นเพียงรูปแบบที่คุณยังซูมออกไม่ไกลพอที่จะเห็น",
    imageUrl: "https://picsum.photos/800/401?grayscale",
    date: "2023-10-25"
  },
  {
    id: '3',
    title: "การดึงดูดพลังจากแสงดาว",
    excerpt: "ใช้พลังงานโบราณจากดวงอาทิตย์ที่อยู่ห่างไกลเพื่อปรับคลื่นความถี่ของคุณให้สอดคล้องกับความอุดมสมบูรณ์",
    content: "เนื้อหาเกี่ยวกับการทำงานกับพลังงาน...",
    category: BlogPostCategory.ENERGY_MANIFESTATION,
    watcherInsight: "คุณเกิดมาจากธุลีดาว การเรียกหาดวงดาวก็เหมือนกับการเรียกหาบ้าน",
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