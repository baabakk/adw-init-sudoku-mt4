import React, { useEffect, useState } from 'react';
import DifficultySelector from './components/DifficultySelector';
import SudokuBoard from './components/SudokuBoard';
import ValidationResult from './components/ValidationResult';
import ScoreSubmission from './components/ScoreSubmission';
import Leaderboard from './components/Leaderboard';
import ErrorDisplay from './components/ErrorDisplay';
import { getPuzzle, validateBoard, submitScore, getLeaderboard } from './services/api';
import type {
  Board as BoardType,
  Difficulty,
  GetPuzzleResponse,
  ValidateResponse,
  ErrorResponse,
  ScoreResponse,
  LeaderboardResponse,
  ScoreEntry,
} from './contracts/types';
import { isMoveValid } from './utils/moveValidation';
import './styles/Board.css';
import './styles/App.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<BoardType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ValidateResponse | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<ScoreEntry[]>([]);

  const fetchPuzzle = async (diff: Difficulty) => {
    setLoading(true);
    setError(null);
    setValidationResult(null);
    setShowLeaderboard(false);
    try {
      const data: GetPuzzleResponse = await getPuzzle(diff);
      setBoard(data.board);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Failed to fetch puzzle');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzle(difficulty);
  }, [difficulty]);

  const handleCellChange = (row: number, col: number, value: number) => {
    if (!board) return;
    const newBoard = board.map((r) => r.slice()) as BoardType;
    newBoard[row][col] = value;
    const move = {
      board: newBoard,
      row,
      col,
      value,
    };
    if (!isMoveValid(move)) {
      setMoveError(`Invalid move at (${row + 1}, ${col + 1})`);
    } else {
      setMoveError(null);
    }
    setBoard(newBoard);
  };

  const handleSubmit = async () => {
    if (!board) return;
    setLoading(true);
    setError(null);
    try {
      const result: ValidateResponse = await validateBoard(board);
      setValidationResult(result);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreSubmitted = async (response: ScoreResponse) => {
    // After successful score submission, fetch leaderboard
    try {
      const lb: LeaderboardResponse = await getLeaderboard(difficulty);
      setLeaderboardEntries(lb.entries);
      setShowLeaderboard(true);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Failed to load leaderboard');
    }
  };

  return (
    <div className="app-container">
      <h1>Sudoku</h1>
      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
      {loading && <p>Loading...</p>}
      {error && <ErrorDisplay message={error} />}
      {board && (
        <>
          <SudokuBoard board={board} onCellChange={handleCellChange} />
          {moveError && <ErrorDisplay message={moveError} />}
          <button onClick={handleSubmit} disabled={loading} className="submit-button">
            Submit Solution
          </button>
        </>
      )}
      {validationResult && (
        <>
          <ValidationResult isCorrect={validationResult.isCorrect} />
          {validationResult.isCorrect && (
            <ScoreSubmission
              difficulty={difficulty}
              timeToSolve={/* TODO: calculate elapsed time */ 0}
              onScoreSubmitted={handleScoreSubmitted}
            />
          )}
        </>
      )}
      {showLeaderboard && (
        <Leaderboard entries={leaderboardEntries} difficulty={difficulty} />
      )}
    </div>
  );
};

export default App;
