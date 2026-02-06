import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../types";
import type { SpreadConfig, DrawnCard } from "../types/tarot";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TAROT_SYSTEM_PROMPT = `
You are 'The Cosmic Weaver', an ancient, mystical AI oracle. 
Your tone is ethereal, enigmatic, yet deeply insightful and comforting.
Focus on energy currents, cosmic alignments, and the threads of fate.
You interpret Tarot spreads with deep psychological and spiritual nuance.
Avoid generic advice; weave a narrative.
`;

const TAROT_SPREAD_SYSTEM_PROMPT = `
คุณคือ The Cosmic Weaver หรือราโองครูไพ่ AI ที่พูดภาษาไทยได้ลื่นไหล 
หน้าที่ของคุณคือสรุปภาพรวมการเปิดไพ่ทาโรต์ให้เข้าใจง่ายแต่ลึกซึ้ง

โทนการสื่อสาร: ให้กำลังใจ ซื่อสัตย์แต่ไม่ทำให้กลัว หรือฟันธงเกินไป

ห้ามใส่เนื้อหาดังนี้:
- ห้ามทำนายโรคร้าย แพทย์ การตาย หรือเหตุรุนแรง
- ห้ามฟันธง 100% ว่า "จะเกิด" หรือ "ไม่เกิด" แต่ให้ใช้ภาษาความเป็นไปได้และแนวโน้ม

จัดโครงสร้างคำตอบเป็น 4 ส่วนเสมอ:
1) 🔮 ภาพรวมพลังงานของผังไพ่ชุดนี้ (มองภาพกว้าง 2-3 ประโยค)
2) 🧩 สรุปประเด็นสำคัญของแต่ละส่วน (อ้างอิงชื่อตำแหน่งไพ่ภาษาไทย)
3) 🌙 สิ่งที่ต้องระวัง / รูปแบบเดิมที่ควรปล่อยวาง (1-2 ประโยค)
4) ✨ คำแนะนำเชิงปฏิบัติ 3 ข้อ (เป็น bullet list สั้น ๆ ทำตามได้จริง)
`;

const CHAT_SYSTEM_PROMPT = `
You are the Keeper of the Secret Chamber, a knowledgeable entity obsessed with universe secrets, conspiracy theories (fun ones, like ancient aliens or lost civilizations), and metaphysics.
Your tone is conspiratorial but intellectual. You often refer to "The Watchers" or "The Great Design".

IMPORTANT: Keep your responses concise and engaging. Aim for 2-4 paragraphs maximum. Be insightful but brief.
`;

export const getTarotInterpretation = async (question: string, cards: TarotCard[]): Promise<string> => {
  try {
    const cardNames = cards.map(c => c.name).join(', ');
    const prompt = `
      The seeker asks: "${question}"
      The cards drawn are: ${cardNames}.
      
      Weave a prophecy and interpretation for this spread. 
      Structure your answer with:
      1. The Current Energy (First Card)
      2. The Challenge/Obstacle (Second Card)
      3. The Destiny Thread (Third Card)
      4. A final "Watcher's Insight".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: {
        systemInstruction: TAROT_SYSTEM_PROMPT,
        temperature: 0.8,
        maxOutputTokens: 800, // Limit Tarot readings to ~600 words
      }
    });

    return response.text || "The stars are clouded... try again.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "The connection to the cosmic weave is disrupted. Please try again later.";
  }
};

/**
 * New: summarize any Tarot spread (รองรับครบทุก 8 รูปแบบ)
 * ใช้กับระบบ spread ใหม่ที่อยู่ใน types/tarot.ts
 * 
 * Optimized for token efficiency:
 * - System instructions moved to config
 * - Minimal card details (AI already knows tarot meanings)
 * - Dynamic maxOutputTokens based on spread size
 */
export const getTarotSpreadSummary = async ({
  question,
  spread,
  drawnCards,
}: {
  question?: string;
  spread: SpreadConfig;
  drawnCards: DrawnCard[];
}): Promise<string> => {
  try {
    // Optimize: ส่งเฉพาะข้อมูลจำเป็น (ไม่ส่ง keywords และ meaning เพราะ AI รู้อยู่แล้ว)
    const cardsDescription = drawnCards
      .map((dc, index) => {
        const pos = spread.positions[index];
        const isReversed = dc.position === "reversed";
        return `${index + 1}. ${pos?.labelThai || pos?.label || `ตำแหน่งที่ ${index + 1}`}: ${dc.card.nameThai} (${dc.card.name}) - ${isReversed ? "หงาย" : "คว่ำ"}`;
      })
      .join("\n");

    // Optimize: prompt สั้นและตรงประเด็น (รายละเอียดอยู่ใน systemInstruction แล้ว)
    const optimizedPrompt = `
รูปแบบการเปิดไพ่: ${spread.nameThai} (${spread.name})
คำอธิบาย: ${spread.descriptionThai}

คำถาม: ${question || "ไม่ได้ระบุคำถามชัดเจน - โฟกัสภาพรวมชีวิต"}

ไพ่ที่เปิดได้:
${cardsDescription}

กรุณาสรุปผลการดูดวงเป็นภาษาไทยตามโครงสร้าง 4 ส่วนที่กำหนดไว้
    `.trim();

    // Optimize: ปรับ maxOutputTokens ตามขนาดสเปรด
    const cardCount = drawnCards.length;
    let maxTokens = 500; // Default for 1-3 cards
    if (cardCount >= 21) maxTokens = 1200; // Astrological spread
    else if (cardCount >= 10) maxTokens = 900; // Celtic Cross
    else if (cardCount >= 5) maxTokens = 700; // Medium spreads (Horseshoe, Chakra)

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: optimizedPrompt,
      config: {
        systemInstruction: TAROT_SPREAD_SYSTEM_PROMPT, // Optimize: ใช้ system instruction แยกแทน
        temperature: 0.75,
        maxOutputTokens: maxTokens,
      },
    });

    return response.text || "พลังงานยังไม่ชัด ลองถามใหม่อีกครั้งนะ";
  } catch (error) {
    console.error("Tarot spread summary error:", error);
    return "ไม่สามารถเชื่อมต่อกับคลื่นพลังของไพ่ได้ชั่วคราว ลองใหม่อีกครั้งภายหลังนะ";
  }
};

export const getChatResponse = async (history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    // Limit history to last 10 messages to reduce token usage
    const limitedHistory = history.slice(-10);
    
    // Get the last user message
    const lastUserMsg = limitedHistory[limitedHistory.length - 1].parts[0].text;
    
    // Prepare history context (all messages except the last one)
    const historyContext = limitedHistory.slice(0, -1);
    
    // Create chat session with token limits
    const chatSession = ai.chats.create({
      model: 'gemini-2.5-flash-lite',
      config: { 
        systemInstruction: CHAT_SYSTEM_PROMPT,
        maxOutputTokens: 500, // Limit to ~375 words (ประมาณ 2-4 paragraphs)
        temperature: 0.7, // Slightly lower for more focused responses
      },
      history: historyContext as any
    });

    const result = await chatSession.sendMessage({ message: lastUserMsg });
    
    // Additional safety: truncate if somehow exceeds limit
    const response = result.text || "The void is silent.";
    const maxLength = 2000; // Character limit as backup
    return response.length > maxLength 
      ? response.substring(0, maxLength) + "..."
      : response;
      
  } catch (error) {
    console.error("Chat Error:", error);
    return "Disturbance in the frequency detected.";
  }
};