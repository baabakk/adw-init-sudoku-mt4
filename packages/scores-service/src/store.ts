// src/store.ts
// In‑memory store for score entries.

import { ScoreEntry, Difficulty } from "@init-sudoku-mt4/contracts";

// The internal array holds all submitted scores.
const scores: ScoreEntry[] = [];

/**
 * Add a new score entry to the store.
 */
export function addScore(entry: ScoreEntry): void {
  // Basic validation – ensure difficulty is one of the allowed literals.
  if (!isValidDifficulty(entry.difficulty)) {
    throw new Error(`Invalid difficulty: ${entry.difficulty}`);
  }
  scores.push(entry);
}

/**
 * Retrieve the top‑10 scores for a given difficulty, sorted by the fastest
 * timeToSolve (ascending).
 */
export function getTopScores(difficulty: Difficulty): ScoreEntry[] {
  const filtered = scores.filter((s) => s.difficulty === difficulty);
  const sorted = filtered.sort((a, b) => a.timeToSolve - b.timeToSolve);
  return sorted.slice(0, 10);
}

function isValidDifficulty(d: string): d is Difficulty {
  return d === "easy" || d === "medium" || d === "hard";
}
