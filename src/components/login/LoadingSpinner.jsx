import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" style={{ backgroundColor: 'lightpurple' }}>
      <div className="spinner">Processing, please wait...</div>
    </div>
  );
}

export default LoadingSpinner;
