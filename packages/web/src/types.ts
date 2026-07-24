export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ScoreSubmission {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number; // milliseconds
}

export interface ScoreResponse {
  status: string;
}

export interface ScoreEntry {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number; // milliseconds
  rank: number;
}

export interface LeaderboardResponse {
  entries: ScoreEntry[];
}

export interface ErrorResponse {
  errorCode: string;
  message: string;
}
