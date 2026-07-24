import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';
import * as scoresService from '../api/scoresService';
import type { Difficulty, LeaderboardResponse, ScoreEntry } from '../../contracts';

jest.mock('../api/scoresService');

describe('Leaderboard component', () => {
  const mockGetLeaderboard = scoresService.getLeaderboard as jest.MockedFunction<typeof scoresService.getLeaderboard>;

  const difficulty: Difficulty = 'easy';
  const entries: ScoreEntry[] = [
    { playerName: 'Alice', difficulty: 'easy', timeToSolve: 1200, rank: 1 },
    { playerName: 'Bob', difficulty: 'easy', timeToSolve: 1500, rank: 2 },
  ];
  const mockResponse: LeaderboardResponse = { entries } as const;

  it('renders loading state then leaderboard', async () => {
    mockGetLeaderboard.mockResolvedValueOnce(mockResponse);
    render(<Leaderboard difficulty={difficulty} />);
    expect(screen.getByText(/Loading leaderboard/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 entries
  });

  it('displays error message on failure', async () => {
    mockGetLeaderboard.mockRejectedValueOnce({ message: 'Network error' } as any);
    render(<Leaderboard difficulty={difficulty} />);
    await waitFor(() => expect(screen.getByText(/Network error/i)).toBeInTheDocument());
  });
});
