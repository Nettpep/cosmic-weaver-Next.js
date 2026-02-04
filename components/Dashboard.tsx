import React from 'react';
import { TarotReading } from '../types';
import { User, Activity, Clock } from 'lucide-react';

interface DashboardProps {
    readings: TarotReading[];
}

const Dashboard: React.FC<DashboardProps> = ({ readings }) => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                <User className="w-8 h-8 text-cosmic-gold" />
                Fate Weaver Dashboard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-900/60 p-6 rounded-xl border border-purple-500/20">
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Total Threads</h3>
                    <p className="text-3xl text-white font-serif">{readings.length}</p>
                </div>
                <div className="bg-slate-900/60 p-6 rounded-xl border border-purple-500/20">
                     <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Soul Level</h3>
                    <p className="text-3xl text-cosmic-gold font-serif">Awakened</p>
                </div>
                <div className="bg-slate-900/60 p-6 rounded-xl border border-purple-500/20">
                     <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Cosmic Affinity</h3>
                    <p className="text-3xl text-purple-400 font-serif">Void</p>
                </div>
            </div>

            <h3 className="text-xl text-purple-200 mb-6 font-serif border-b border-white/10 pb-2">Destiny Threads (History)</h3>
            
            <div className="space-y-4">
                {readings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 italic border border-dashed border-gray-800 rounded-xl">
                        No threads woven yet. Consult the Tarot to begin.
                    </div>
                ) : (
                    readings.map((reading) => (
                        <div key={reading.id} className="bg-black/30 border border-slate-800 rounded-lg p-6 relative overflow-hidden group hover:border-cosmic-purple/40 transition">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cosmic-purple to-transparent"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs text-cosmic-gold mb-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {new Date(reading.date).toLocaleDateString()}
                                    </p>
                                    <h4 className="text-lg text-white font-medium">"{reading.question}"</h4>
                                </div>
                                <div className="flex -space-x-3">
                                    {reading.cards.map(card => (
                                        <div key={card.name} className="w-10 h-14 bg-gray-800 rounded border border-gray-600 overflow-hidden relative" title={card.name}>
                                            <img src={card.image} className="w-full h-full object-cover opacity-60"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2 italic font-serif">
                                {reading.interpretation}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;