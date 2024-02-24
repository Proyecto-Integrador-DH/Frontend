import React from 'react';

const ErrorComponent = ({ title, message, footer }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-header">
          <span className="error-icon">⚠️</span>
          <h2>{title}</h2>
        </div>
        <p>{message}</p>
        {footer && <p>{footer}</p>}
      </div>
    </div>
  );
};

export default ErrorComponent;