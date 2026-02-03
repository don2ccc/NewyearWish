import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Wish } from '../types';
import { MOCK_WISHES, TABLE_NAME } from '../constants';
import { sanitizeInput } from '../utils/security';

// NOTE: In a real Vercel environment, these would come from process.env
// We check multiple common prefixes for convenience
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;
let isMockMode = false;

// Initialize if keys are present
if (supabaseUrl && supabaseKey) {
  try {
    client = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client initialized.");
  } catch (e) {
    console.warn("Failed to initialize Supabase client, falling back to mock mode.", e);
    isMockMode = true;
  }
} else {
  console.log("No Supabase credentials found. Running in Mock Mode.");
  isMockMode = true;
}

// In-memory store for mock mode
let localWishes = [...MOCK_WISHES];

export const wishService = {
  isMock: () => isMockMode,

  getWishes: async (): Promise<Wish[]> => {
    if (isMockMode || !client) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return [...localWishes];
    }

    const { data, error } = await client
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching wishes:', error);
      return [];
    }
    return data as Wish[];
  },

  addWish: async (content: string, name: string): Promise<Wish | null> => {
    // Defense in depth: Sanitize inputs at the service boundary as well
    const cleanContent = sanitizeInput(content);
    const cleanName = sanitizeInput(name) || 'Anonymous';

    const newWish = {
      content: cleanContent,
      name: cleanName,
    };

    if (isMockMode || !client) {
       // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockWish: Wish = {
        ...newWish,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        is_mock: true
      };
      localWishes = [mockWish, ...localWishes];
      return mockWish;
    }

    const { data, error } = await client
      .from(TABLE_NAME)
      .insert([newWish])
      .select()
      .single();

    if (error) {
      console.error('Error adding wish:', error);
      throw error;
    }
    return data as Wish;
  }
};