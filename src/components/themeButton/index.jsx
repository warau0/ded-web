import React, { useContext, memo } from 'react';

import { ThemeContext } from 'context/themeContext';
import moon from 'assets/moon.png';
import sun from 'assets/sun.png';
import { THEME } from 'constants';

import * as styles from './styles.pcss';

export default memo(() => {
  const [ theme, setTheme ] = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === THEME.LIGHT ? 'dark' : 'light')
  }
  console.log('Render <ThemeButton />');
  return (
    <button onClick={toggleTheme} className={styles.ghost}>
      <img
        src={theme === THEME.LIGHT ? sun : moon}
        className={styles.icon}
      />
    </button>
  );
});
