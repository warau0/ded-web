import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/button';
import { ThemeContext } from 'context/themeContext';
import logo from 'assets/logo.png';
import { THEME } from 'constants';

import * as styles from './styles.pcss';

export default () => {
  const [ theme, setTheme ] = useContext(ThemeContext);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link to='' className={styles.logo} tabIndex={-1}>
          <img src={logo} alt='Logo' />
          <span>{'Draw Every Day!'}</span>
        </Link>
      </div>

      <div className={styles.right}>
        <Button>{'Upload'}</Button>
        <Link to='profile'>Profile</Link>

        <button onClick={() => {setTheme(theme === THEME.LIGHT ? 'dark' : 'light')}}>
          Theme: {theme === THEME.LIGHT ? 'light' : 'dark'}
        </button>
      </div>
    </div>
  );
};
