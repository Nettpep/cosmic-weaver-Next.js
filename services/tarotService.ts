import { supabase } from '@/lib/supabase';
import { TarotCard } from '@/types';

export interface TarotReading {
  id: string;
  user_id: string | null;
  question: string | null;
  cards_drawn: TarotCard[];
  interpretation: string;
  spread_type: string;
  created_at: string;
}

export interface SaveReadingData {
  question?: string;
  cards_drawn: TarotCard[];
  interpretation: string;
  spread_type?: string;
}

// Save reading to database
export async function saveReading(readingData: SaveReadingData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to save readings');
  }

  const { data, error } = await supabase
    .from('tarot_readings')
    .insert({
      user_id: user.id,
      ...readingData,
      spread_type: readingData.spread_type || 'three-card',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Fetch user's readings
export async function getReadings(limit = 20, offset = 0) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to view readings');
  }

  const { data, error } = await supabase
    .from('tarot_readings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

// Get single reading by ID
export async function getReadingById(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to view readings');
  }

  const { data, error } = await supabase
    .from('tarot_readings')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

// Delete reading
export async function deleteReading(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to delete readings');
  }

  const { error } = await supabase
    .from('tarot_readings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}

// Get card statistics
export async function getStats() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to view stats');
  }

  const { data, error } = await supabase
    .from('tarot_readings')
    .select('cards_drawn')
    .eq('user_id', user.id);

  if (error) throw error;

  // Count card appearances
  const cardCounts: Record<string, number> = {};
  
  data?.forEach(reading => {
    reading.cards_drawn.forEach((card: TarotCard) => {
      cardCounts[card.name] = (cardCounts[card.name] || 0) + 1;
    });
  });

  return {
    totalReadings: data?.length || 0,
    cardCounts,
    mostDrawnCard: Object.entries(cardCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || null,
  };
}
