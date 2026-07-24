import React from 'react';
import type { Difficulty } from '../../contracts/types';

interface Props {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<Props> = ({ selected, onSelect }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="difficulty-selector">
      {difficulties.map((d) => (
        <label key={d} style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="difficulty"
            value={d}
            checked={selected === d}
            onChange={() => onSelect(d)}
          />
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default DifficultySelector;
