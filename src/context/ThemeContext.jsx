import React, { useState, useEffect } from 'react';
import { ThemeContext } from './themeContextValue';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Light is default as requested
    return localStorage.getItem('app-theme') || 'light';
  });

  useEffect(() => {
    // Update local storage
    localStorage.setItem('app-theme', theme);
    // Update DOM attribute
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
