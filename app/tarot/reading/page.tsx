'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SpreadConfig } from '@/types/tarot';
import { useTarotStore } from '@/store/tarotStore';
import Navigation from '@/components/Navigation';
import SpreadSelector from '@/components/tarot/SpreadSelector';
import ReadingSession from '@/components/tarot/ReadingSession';

export default function ReadingPage() {
    const router = useRouter();
    const { startReading, currentSession } = useTarotStore();
    const [selectedSpread, setSelectedSpread] = useState<SpreadConfig | null>(null);

    const handleSelectSpread = (spread: SpreadConfig) => {
        setSelectedSpread(spread);
        startReading(spread);
    };

    const handleComplete = () => {
        setSelectedSpread(null);
        router.push('/tarot');
    };

    const handleCancel = () => {
        setSelectedSpread(null);
    };

    // Show reading session if one is active
    if (currentSession && selectedSpread) {
        return (
            <>
                <Navigation />
                <div style={{ paddingTop: '64px' }}>
                    <ReadingSession
                        spread={selectedSpread}
                        onComplete={handleComplete}
                        onCancel={handleCancel}
                    />
                </div>
            </>
        );
    }

    // Show spread selector
    return (
        <>
            <Navigation />
            <div style={{ paddingTop: '64px' }}>
                <SpreadSelector onSelectSpread={handleSelectSpread} />
            </div>
        </>
    );
}
