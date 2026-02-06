export enum BlogPostCategory {
  UNIVERSE_SECRETS = 'ความลับแห่งจักรวาล',
  UNSOLVED_MYSTERIES = 'ปริศนาที่ยังไม่มีคำตอบ',
  ENERGY_MANIFESTATION = 'พลังงานและการดึงดูด',
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  category: BlogPostCategory;
  watcherInsight: string;
  imageUrl: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TarotCard {
  name: string;
  image: string; // Placeholder URL
  keywords: string[];
}

export interface TarotReading {
  id: string;
  question: string;
  cards: TarotCard[];
  interpretation: string;
  date: string;
}

export type ViewState = 'HOME' | 'BLOG' | 'TAROT' | 'SECRET_CHAMBER' | 'DASHBOARD';