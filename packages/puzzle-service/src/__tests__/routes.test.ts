import request from 'supertest';
import app from '../index';

describe('Puzzle Service Routes', () => {
  describe('GET /puzzle', () => {
    it('should return a puzzle with difficulty easy', async () => {
      const response = await request(app).get('/puzzle').query({ difficulty: 'easy' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('board');
      expect(response.body).toHaveProperty('difficulty', 'easy');
      const board = response.body.board;
      expect(Array.isArray(board)).toBe(true);
      expect(board.length).toBe(9);
      board.forEach((row: any) => {
        expect(Array.isArray(row)).toBe(true);
        expect(row.length).toBe(9);
      });
    });

    it('should return 400 for missing difficulty', async () => {
      const response = await request(app).get('/puzzle');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errorCode');
    });
  });

  describe('POST /validate', () => {
    it('should validate a correct board', async () => {
      const board = Array.from({ length: 9 }, () => Array(9).fill(0));
      const response = await request(app).post('/validate').send({ board });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('isCorrect', true);
    });

    it('should return 400 for invalid payload', async () => {
      const response = await request(app).post('/validate').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errorCode');
    });
  });
});
