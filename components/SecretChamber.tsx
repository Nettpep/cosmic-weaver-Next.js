import React, { useState, useEffect, useRef } from 'react';
import { Send, Lock, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const SecretChamber: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: "You have entered the Secret Chamber. The threads of reality are thin here. What secrets do you seek?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Prepare history for Gemini
    const history = messages.concat(userMsg).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await getChatResponse(history);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] bg-black/40 backdrop-blur-md border border-cosmic-purple/30 rounded-lg flex flex-col relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
      
      {/* Header */}
      <div className="p-4 border-b border-cosmic-purple/20 bg-slate-900/50 flex items-center justify-between">
        <h2 className="text-cosmic-gold font-serif tracking-widest flex items-center gap-2">
          <Lock className="w-4 h-4" /> SECRET CHAMBER
        </h2>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-lg text-sm md:text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-purple-900/40 text-purple-100 border border-purple-700/50 rounded-br-none' 
                : 'bg-slate-800/60 text-gray-300 border border-slate-700/50 rounded-bl-none shadow-glow'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-slate-800/60 p-4 rounded-lg rounded-bl-none flex items-center gap-2">
               <Loader2 className="w-4 h-4 animate-spin text-cosmic-gold" />
               <span className="text-xs text-gray-400 italic">Weaving response...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/80 border-t border-cosmic-purple/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Whisper into the void..."
            className="flex-1 bg-black/50 border border-slate-700 text-purple-100 px-4 py-2 rounded focus:outline-none focus:border-cosmic-gold/50 transition font-sans"
          />
          <button 
            onClick={handleSend}
            disabled={!input || isTyping}
            className="bg-cosmic-purple/20 hover:bg-cosmic-purple/40 text-cosmic-gold border border-cosmic-purple/50 p-2 rounded transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretChamber;