import React from 'react';

interface Props {
  /** Message to display */
  message: string;
}

const ErrorDisplay: React.FC<Props> = ({ message }) => (
  <div className="error-display" role="alert">
    {message}
  </div>
);

export default ErrorDisplay;
