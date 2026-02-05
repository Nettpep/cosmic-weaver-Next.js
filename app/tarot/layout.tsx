import React from 'react';
import '@/styles/tarot.css';
import '../globals.css';
import StarBackground from '@/components/StarBackground';

export default function TarotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen text-slate-200 font-sans selection:bg-cosmic-purple selection:text-white">
            <StarBackground />
            <main className="relative z-10">{children}</main>
        </div>
    );
}
