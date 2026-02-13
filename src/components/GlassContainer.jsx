import React from 'react';

const GlassContainer = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass-effect glass-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
