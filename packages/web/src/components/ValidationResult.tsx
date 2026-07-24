import React from 'react';

type Props = {
  isCorrect: boolean;
};

const ValidationResult: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="validation-result">
      {isCorrect ? (
        <p className="success">Congratulations! The solution is correct.</p>
      ) : (
        <p className="error">The solution is incorrect. Please try again.</p>
      )}
    </div>
  );
};

export default ValidationResult;
