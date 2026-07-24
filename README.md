# init-sudoku-mt4 — shared foundation

Generated deterministically by DevOps from the approved project-decomposition.

**Stack:** TypeScript (npm workspaces)
- install: `npm install`
- build: `npm run build`
- test: `npm test`

## Subsystems (one feature team each)
- **web-client** — Web Client: Single-page browser application that renders a 9x9 Sudoku board, accepts player input, validates moves on the client, fetches a new puzzle from the Puzzle Service, and posts completed-game results to the Scores Service.
  - owns: packages/web
  - dependsOn: puzzle-service, scores-service, contracts
- **puzzle-service** — Puzzle Service: Stateless HTTP service that generates uniquely-solvable Sudoku puzzles at three difficulty levels (easy, medium, hard) and validates a submitted solution.
  - owns: packages/puzzle-service
  - dependsOn: contracts
- **scores-service** — Scores Service: HTTP service that records completed-game results (player name, difficulty, time-to-solve) and serves a per-difficulty top-10 leaderboard sorted by fastest solve time.
  - owns: packages/scores-service
  - dependsOn: contracts

## Shared contracts
- packages/contracts
