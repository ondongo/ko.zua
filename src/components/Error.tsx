import React from 'react';

type ErrorProps = {
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ message }) => {
  if (!message) {
    return null; 
  }

  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default Error;
