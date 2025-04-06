import React from "react";

type ErrorProps = {
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`rounded-md 
 p-4  bg-error-400 text-white`}
    >
      <p> {message}</p>
    </div>
  );
};

export default Error;
