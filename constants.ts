import { Wish } from './types';

// Used when Supabase keys are not present or for initial rendering
export const MOCK_WISHES: Wish[] = [
  {
    id: 'm1',
    content: "Wishing everyone a year filled with prosperity and joy! 🧧",
    name: "Happy Panda",
    created_at: new Date().toISOString(),
    is_mock: true
  },
  {
    id: 'm2',
    content: "May your code compile on the first try in 2024! 💻✨",
    name: "Dev Wizard",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    is_mock: true
  },
  {
    id: 'm3',
    content: "Health, wealth, and happiness for my family. Gong Xi Fa Cai! 🏮",
    name: "Li Wei",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    is_mock: true
  },
  {
    id: 'm4',
    content: "Hoping to travel more this year! 🌏✈️",
    name: "TravelBug",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    is_mock: true
  },
  {
    id: 'm5',
    content: "Good grades and passing all my exams! 📚",
    name: "Student A",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    is_mock: true
  },
  {
    id: 'm6',
    content: "Let this year be the best one yet. Peace and love. ❤️",
    name: "PeaceSeeker",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    is_mock: true
  },
  {
    id: 'm7',
    content: "Getting that promotion! 🚀",
    name: "CareerFocus",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    is_mock: true
  }
];

export const TABLE_NAME = 'wishes';