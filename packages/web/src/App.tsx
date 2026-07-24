import React, { useEffect, useState } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Board from './components/Board';
import ValidationResult from './components/ValidationResult';
import { getPuzzle, validateBoard } from './services/api';
import type { Board as BoardType, Difficulty, GetPuzzleResponse, ValidateResponse, ErrorResponse, MoveValidation } from './contracts/types';
import { isMoveValid } from './utils/moveValidation';
import './styles/Board.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<BoardType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ValidateResponse | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);

  const fetchPuzzle = async (diff: Difficulty) => {
    setLoading(true);
    setError(null);
    setValidationResult(null);
    try {
      const data: GetPuzzleResponse = await getPuzzle(diff);
      setBoard(data.board);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.error ?? 'Failed to fetch puzzle');
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
    newBoard[row][col] = value as any; // Board type expects numbers 0-9
    // Prepare move validation contract
    const move: MoveValidation = {
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
      setError(err.error ?? 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Sudoku</h1>
      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {board && (
        <>
          <Board board={board} onCellChange={handleCellChange} />
          {moveError && <p className="error">{moveError}</p>}
          <button onClick={handleSubmit} disabled={loading} className="submit-button">
            Submit Solution
          </button>
        </>
      )}
      {validationResult && (
        <ValidationResult isCorrect={validationResult.isCorrect} />
      )}
    </div>
  );
};

export default App;
