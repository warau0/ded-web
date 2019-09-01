import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from 'ded-components/button';
import { ThemeContext } from 'ded-context/themeContext';
import { sun, moon } from 'ded-assets';
import { THEME } from 'ded-constants';

import * as styles from './styles.pcss';

const ThemeButton = memo(({ showLabel, smallerPadding }) => {
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
      className={cn({ [styles.smallerPadding]: smallerPadding })}
    >
      <span className={styles.innerButton}>
        {showLabel && <span>Theme</span>}
        <img
          src={theme === THEME.LIGHT ? sun : moon}
          alt={theme === THEME.LIGHT ? 'Light theme' : 'Dark theme'}
          className={styles.icon}
        />
      </span>
    </Button>
  );
});

ThemeButton.defaultProps = {
  showLabel: true,
  smallerPadding: false,
};

ThemeButton.propTypes = {
  showLabel: PropTypes.bool,
  smallerPadding: PropTypes.bool,
};

export default ThemeButton;
