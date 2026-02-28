import { create } from 'zustand';
import type { CognitiveScore, MoodEntry, GameResult, LonelinessData } from '@/types/cognitive.types';

interface CognitiveState {
  currentScore: number;
  scores: CognitiveScore[];
  moods: MoodEntry[];
  gameResults: GameResult[];
  lonelinessData: LonelinessData[];
  medicationCompliance: number;
}

export const useCognitiveStore = create<CognitiveState>(() => ({
  currentScore: 74,
  medicationCompliance: 87,
  scores: [
    { date: 'Mon', score: 78, category: 'memory' },
    { date: 'Tue', score: 72, category: 'memory' },
    { date: 'Wed', score: 75, category: 'memory' },
    { date: 'Thu', score: 70, category: 'memory' },
    { date: 'Fri', score: 74, category: 'memory' },
    { date: 'Sat', score: 76, category: 'memory' },
    { date: 'Sun', score: 74, category: 'memory' },
  ],
  moods: [
    { date: 'Mon', mood: 7, label: 'Happy' },
    { date: 'Tue', mood: 5, label: 'Neutral' },
    { date: 'Wed', mood: 8, label: 'Happy' },
    { date: 'Thu', mood: 4, label: 'Sad' },
    { date: 'Fri', mood: 6, label: 'Neutral' },
    { date: 'Sat', mood: 7, label: 'Happy' },
    { date: 'Sun', mood: 8, label: 'Happy' },
  ],
  gameResults: [
    { game: 'Memory Match', score: 85, accuracy: 78, date: 'Today' },
    { game: 'Pattern Recognition', score: 72, accuracy: 65, reactionTime: 2.3, date: 'Today' },
    { game: 'Word Recall', score: 68, accuracy: 60, date: 'Yesterday' },
    { game: 'Reaction Test', score: 90, accuracy: 88, reactionTime: 0.8, date: 'Yesterday' },
  ],
  lonelinessData: [
    { date: 'Mon', index: 35 },
    { date: 'Tue', index: 42 },
    { date: 'Wed', index: 28 },
    { date: 'Thu', index: 55 },
    { date: 'Fri', index: 38 },
    { date: 'Sat', index: 25 },
    { date: 'Sun', index: 30 },
  ],
}));
