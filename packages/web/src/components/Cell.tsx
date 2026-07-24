import React, { useState } from 'react';
import type { Board as BoardType } from '../contracts/types';

interface Props {
  row: number;
  col: number;
  value: number; // 0 = empty, 1-9 = filled
  readOnly: boolean;
  onChange: (row: number, col: number, value: number) => void;
}

const Cell: React.FC<Props> = ({ row, col, value, readOnly, onChange }) => {
  const [input, setInput] = useState<string>(value === 0 ? '' : String(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only digits 1-9, or empty string
    if (val === '' || (/^[1-9]$/.test(val) && val.length === 1)) {
      setInput(val);
      const num = val === '' ? 0 : Number(val);
      onChange(row, col, num);
    }
  };

  return (
    <input
      className="cell"
      type="text"
      maxLength={1}
      value={input}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
};

export default Cell;
