import React, { useContext } from 'react';
import cn from 'classnames';

import { ThemeContext } from 'context/themeContext';

import * as styles from './styles.pcss';

export default ({ children }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className={cn(styles.wrapper, styles[theme])}>{children}</div>
  );
};
