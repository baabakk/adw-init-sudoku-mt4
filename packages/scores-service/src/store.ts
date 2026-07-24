// src/store.ts
// In‑memory store for score entries.
// Provides duplicate handling (ignore exact duplicates) and retrieval of the top‑N scores per difficulty.

import { ScoreSubmission, ScoreEntry, Difficulty } from "@init-sudoku-mt4/contracts";

// Internal representation without the rank field (rank is computed on retrieval).
interface InternalScore {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number;
}

// The array holds all submitted scores.
const scores: InternalScore[] = [];

/**
 * Add a new score entry to the store.
 * If an identical entry (same playerName, difficulty, and timeToSolve) already exists,
 * the call is ignored.
 */
export function addScore(entry: ScoreSubmission): void {
  // Validate difficulty – defensive programming.
  if (!isValidDifficulty(entry.difficulty)) {
    throw new Error(`Invalid difficulty: ${entry.difficulty}`);
  }

  // Check for duplicate.
  const duplicate = scores.find(
    (s) =>
      s.playerName === entry.playerName &&
      s.difficulty === entry.difficulty &&
      s.timeToSolve === entry.timeToSolve,
  );
  if (duplicate) {
    // Duplicate – ignore.
    return;
  }

  // Store the new score.
  scores.push({
    playerName: entry.playerName,
    difficulty: entry.difficulty,
    timeToSolve: entry.timeToSolve,
  });
}

/**
 * Retrieve the top‑N scores for a given difficulty, sorted by the fastest timeToSolve.
 * The returned objects conform to the ScoreEntry contract, with the `rank` field populated
 * (1‑based index in the sorted list).
 */
export function getTopScores(difficulty: Difficulty, limit = 10): ScoreEntry[] {
  const filtered = scores.filter((s) => s.difficulty === difficulty);
  const sorted = filtered.sort((a, b) => a.timeToSolve - b.timeToSolve);
  const top = sorted.slice(0, limit);
  // Map to ScoreEntry with rank.
  return top.map((s, idx) => ({
    playerName: s.playerName,
    difficulty: s.difficulty,
    timeToSolve: s.timeToSolve,
    rank: idx + 1,
  }));
}

function isValidDifficulty(d: string): d is Difficulty {
  return d === "easy" || d === "medium" || d === "hard";
}
