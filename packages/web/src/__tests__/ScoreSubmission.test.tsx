import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScoreSubmission from '../components/ScoreSubmission';
import * as scoresService from '../api/scoresService';
import type { Difficulty, ScoreResponse } from '../../contracts';

jest.mock('../api/scoresService');

describe('ScoreSubmission component', () => {
  const mockSubmitScore = scoresService.submitScore as jest.MockedFunction<typeof scoresService.submitScore>;
  const difficulty: Difficulty = 'easy';
  const timeToSolve = 30; // seconds
  const onScoreSubmitted = jest.fn();

  it('submits score and calls onScoreSubmitted on success', async () => {
    const mockResp: ScoreResponse = { status: 'ok' } as const;
    mockSubmitScore.mockResolvedValueOnce(mockResp);
    render(<ScoreSubmission difficulty={difficulty} timeToSolve={timeToSolve} onScoreSubmitted={onScoreSubmitted} />);
    const input = screen.getByLabelText(/Name:/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Alice' } });
    const button = screen.getByRole('button', { name: /Submit Score/i });
    fireEvent.click(button);
    await waitFor(() => expect(mockSubmitScore).toHaveBeenCalledTimes(1));
    expect(onScoreSubmitted).toHaveBeenCalledWith(mockResp);
    expect(screen.getByText(/Score submitted!/i)).toBeInTheDocument();
  });

  it('displays error message on failure', async () => {
    mockSubmitScore.mockRejectedValueOnce({ message: 'Network error' } as any);
    render(<ScoreSubmission difficulty={difficulty} timeToSolve={timeToSolve} onScoreSubmitted={onScoreSubmitted} />);
    const input = screen.getByLabelText(/Name:/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Bob' } });
    const button = screen.getByRole('button', { name: /Submit Score/i });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText(/Network error/i)).toBeInTheDocument());
  });
});
