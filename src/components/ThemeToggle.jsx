import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const context = useContext(ThemeContext);
  const theme = context?.theme || 'light';
  const toggleTheme = context?.toggleTheme || (() => {});

  return (
    <Button
      variant="link"
      onClick={toggleTheme}
      className="p-2 text-decoration-none d-flex align-items-center justify-content-center border-0"
      style={{
        color: 'var(--bs-body-color)',
        transition: 'var(--transition-smooth)',
        borderRadius: '50%',
        width: '40px',
        height: '40px'
      }}
      aria-label="Toggle Theme"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};

export default ThemeToggle;
