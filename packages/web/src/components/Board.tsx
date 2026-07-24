import React from 'react';
import Cell from './Cell';
import type { Board as BoardType } from '../types';

interface Props {
  board: BoardType;
  onCellChange: (row: number, col: number, value: number) => void;
}

const Board: React.FC<Props> = ({ board, onCellChange }) => {
  return (
    <div className="sudoku-board">
      {board.map((row: ReadonlyArray<number>, rowIndex: number) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cellValue: number, colIndex: number) => (
            <Cell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              value={cellValue}
              readOnly={false}
              onChange={onCellChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
