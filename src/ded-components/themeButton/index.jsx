import React, { useContext, memo } from 'react';

import Button from 'ded-components/button';
import { ThemeContext } from 'ded-context/themeContext';
import { sun, moon } from 'ded-assets';
import { THEME } from 'ded-constants';

import * as styles from './styles.pcss';

export default memo(() => {
  const [theme, setTheme] = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === THEME.LIGHT ? 'dark' : 'light');
  };

  return (
    <Button
      onClick={toggleTheme}
      plainFocus
      plainText
      brand='ghost'
    >
      <span className={styles.innerButton}>
        <span>Theme</span>
        <img
          src={theme === THEME.LIGHT ? sun : moon}
          alt={theme === THEME.LIGHT ? 'Light theme' : 'Dark theme'}
          className={styles.icon}
        />
      </span>
    </Button>
  );
});
