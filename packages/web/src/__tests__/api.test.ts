import { submitScore, getLeaderboard } from '../api/scoresService';
import type { ScoreSubmission, Difficulty, LeaderboardResponse, ScoreEntry, ErrorResponse } from '../../contracts';

describe('scoresService API client', () => {
  const originalFetch = global.fetch as any;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('submitScore resolves with ScoreResponse on success', async () => {
    const mockResponse = { status: 'ok' } as const;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    const payload: ScoreSubmission = {
      playerName: 'Alice',
      difficulty: 'easy',
      timeToSolve: 12345,
    };
    const result = await submitScore(payload);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('/scores', expect.objectContaining({ method: 'POST' }));
  });

  it('getLeaderboard resolves with LeaderboardResponse on success', async () => {
    const entries: ScoreEntry[] = [
      { playerName: 'Bob', difficulty: 'easy', timeToSolve: 1000, rank: 1 },
    ];
    const mockResponse: LeaderboardResponse = { entries } as const;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    const result = await getLeaderboard('easy' as Difficulty);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('submitScore throws ErrorResponse on failure', async () => {
    const err: ErrorResponse = { errorCode: 'E001', message: 'Bad request' } as const;
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => err,
    });
    const payload: ScoreSubmission = {
      playerName: 'Alice',
      difficulty: 'easy',
      timeToSolve: 12345,
    };
    await expect(submitScore(payload)).rejects.toEqual(err);
  });
});
