import React, { useState, createContext } from 'react';

import { THEME, STORAGE } from 'constants';

const ThemeContext = createContext([THEME.LIGHT, () => {}]);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem(STORAGE.THEME) || THEME.LIGHT);

  const saveTheme = value => {
    localStorage.setItem(STORAGE.THEME, value);
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={[theme, saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
