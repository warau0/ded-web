import React, { useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ThemeContext } from 'ded-context/themeContext';

import * as styles from './styles.pcss';

const Wrapper = ({ children }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className={cn(styles.wrapper, styles[theme])}>{children}</div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Wrapper;
