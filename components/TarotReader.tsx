import React, { useState } from 'react';
import { Sparkles, RefreshCw, Eye } from 'lucide-react';
import { MAJOR_ARCANA } from '../constants';
import { TarotCard, TarotReading } from '../types';
import { getTarotInterpretation } from '../services/geminiService';

const TarotReader: React.FC<{ onSaveReading?: (reading: TarotReading) => void }> = ({ onSaveReading }) => {
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  const drawCards = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setInterpretation(null);
    setCards([]);

    // Simulate shuffling and picking 3 cards
    const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, 3);
    setCards(drawn);

    try {
      const result = await getTarotInterpretation(question, drawn);
      setInterpretation(result);
      
      if (onSaveReading) {
          onSaveReading({
              id: Date.now().toString(),
              question,
              cards: drawn,
              interpretation: result,
              date: new Date().toISOString()
          });
      }

    } catch (e) {
      console.error(e);
      setInterpretation("The connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[80vh] flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-serif text-cosmic-gold mb-8 tracking-widest text-center animate-pulse-slow">
        Ask the Cosmic Weaver
      </h2>

      {!interpretation && !loading && (
        <div className="w-full max-w-lg relative z-10">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What threads of fate do you wish to see?"
            className="w-full bg-cosmic-800/50 border border-cosmic-purple/50 text-white p-4 rounded-lg focus:outline-none focus:border-cosmic-gold transition duration-300 placeholder-gray-400 font-sans"
          />
          <button
            onClick={drawCards}
            disabled={!question}
            className="mt-6 w-full py-3 bg-gradient-to-r from-purple-900 to-indigo-900 border border-cosmic-gold/30 rounded-lg text-cosmic-gold font-serif hover:bg-cosmic-700 transition flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            Reveal Destiny
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-20 flex flex-col items-center animate-pulse">
            <div className="w-16 h-16 border-4 border-cosmic-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cosmic-purple font-serif text-lg">Consulting the Stars...</p>
        </div>
      )}

      {cards.length > 0 && (
        <div className="mt-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {cards.map((card, idx) => (
              <div 
                key={card.name} 
                className={`bg-slate-900/80 border border-cosmic-purple/30 rounded-xl p-4 flex flex-col items-center transform transition-all duration-700 ${loading ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="w-full aspect-[2/3] bg-black mb-4 rounded-lg overflow-hidden relative group">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
                <h3 className="text-xl font-serif text-cosmic-gold mb-1">{card.name}</h3>
                <p className="text-xs text-purple-300 uppercase tracking-widest">{card.keywords.join(' • ')}</p>
              </div>
            ))}
          </div>

          {interpretation && (
            <div className="bg-slate-900/90 border border-cosmic-gold/20 p-8 rounded-2xl relative overflow-hidden animate-float">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cosmic-gold to-transparent opacity-50"></div>
               <h3 className="text-2xl font-serif text-purple-200 mb-6 flex items-center gap-2">
                 <Eye className="w-6 h-6 text-cosmic-gold" />
                 Watcher's Prophecy
               </h3>
               <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-cosmic-gold font-sans leading-relaxed">
                  <pre className="whitespace-pre-wrap font-sans text-sm md:text-base bg-transparent border-none p-0 m-0">
                    {interpretation}
                  </pre>
               </div>
               <button 
                onClick={() => { setInterpretation(null); setCards([]); setQuestion(''); }}
                className="mt-8 flex items-center gap-2 text-sm text-cosmic-gold/70 hover:text-cosmic-gold transition"
               >
                 <RefreshCw className="w-4 h-4" /> Consult again
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotReader;