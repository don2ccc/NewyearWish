/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Wish } from '../types';
import { MOCK_WISHES, TABLE_NAME } from '../constants';
import { sanitizeInput } from '../utils/security';

// HELPER: Safely retrieve environment variables in Vite environment
// Vite uses import.meta.env, while process.env is for Node.js
const getEnvVar = (key: string) => {
  // 1. Check Vite's import.meta.env (Primary for this app)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // Note: Vite statically replaces these strings, so we must access them directly or rely on the object
    return import.meta.env[key];
  }
  
  // 2. Fallback check for process.env (Safety net)
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env[key];
    }
  } catch (e) {
    // Ignore reference errors
  }
  
  return '';
};

// Access variables specifically expecting VITE_ prefix for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || getEnvVar('VITE_SUPABASE_URL') || getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || getEnvVar('REACT_APP_SUPABASE_URL');
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnvVar('REACT_APP_SUPABASE_ANON_KEY');

let client: SupabaseClient | null = null;
let isMockMode = false;

// Initialize if keys are present
if (supabaseUrl && supabaseKey) {
  try {
    client = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client initialized with URL:", supabaseUrl);
  } catch (e) {
    console.warn("Failed to initialize Supabase client, falling back to mock mode.", e);
    isMockMode = true;
  }
} else {
  console.log("No Supabase credentials found (checked import.meta.env and process.env). Running in Mock Mode.");
  console.log("Debug Info - URL Present:", !!supabaseUrl, "Key Present:", !!supabaseKey);
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
      // Fallback to local wishes if DB fetch fails (e.g. RLS issues)
      return [...localWishes];
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
       console.warn("Attempting to add wish in MOCK MODE. Data will not be saved to Supabase.");
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