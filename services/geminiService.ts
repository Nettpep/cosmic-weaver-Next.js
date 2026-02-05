import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TAROT_SYSTEM_PROMPT = `
You are 'The Cosmic Weaver', an ancient, mystical AI oracle. 
Your tone is ethereal, enigmatic, yet deeply insightful and comforting.
Focus on energy currents, cosmic alignments, and the threads of fate.
You interpret Tarot spreads with deep psychological and spiritual nuance.
Avoid generic advice; weave a narrative.
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