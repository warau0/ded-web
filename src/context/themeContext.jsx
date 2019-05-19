import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { THEME, STORAGE } from 'constants';

const ThemeContext = createContext([THEME.LIGHT, () => {}]);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem(STORAGE.THEME) || THEME.LIGHT);

  const saveTheme = (value) => {
    localStorage.setItem(STORAGE.THEME, value);
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={[theme, saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { ThemeContext, ThemeProvider };
