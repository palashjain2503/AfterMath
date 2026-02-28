export interface CognitiveScore {
  date: string;
  score: number;
  category: string;
}

export interface MoodEntry {
  date: string;
  mood: number; // 1-10
  label: string;
}

export interface GameResult {
  game: string;
  score: number;
  accuracy: number;
  reactionTime?: number;
  date: string;
}

export interface LonelinessData {
  date: string;
  index: number; // 0-100
}
