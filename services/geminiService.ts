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
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: TAROT_SYSTEM_PROMPT,
        temperature: 0.8,
      }
    });

    return response.text || "The stars are clouded... try again.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "The connection to the cosmic weave is disrupted. Please try again later.";
  }
};

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: CHAT_SYSTEM_PROMPT,
      },
      history: history
    });

    // We assume the last message from user is already in the 'history' passed to this function context in a real app,
    // but here we just need to send the last message. 
    // However, for simplicity in this stateless service, we'll just take the last user message to send.
    // In a proper implementation, we'd maintain the Chat object.
    
    // Simplification for this demo:
    const lastUserMsg = history[history.length - 1].parts[0].text;
    
    // We recreate history without the very last message to init the chat, then send the last one.
    const historyContext = history.slice(0, -1);
    
    const chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction: CHAT_SYSTEM_PROMPT },
        history: historyContext as any
    });

    const result = await chatSession.sendMessage({ message: lastUserMsg });
    return result.text || "The void is silent.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Disturbance in the frequency detected.";
  }
};