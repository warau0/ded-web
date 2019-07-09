import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Loader = memo(({ className, size, ...restProps }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div
      className={cn(
        styles.loader,
        styles[theme],
        styles[size],
        { [className]: className },
      )}
      {...restProps}
    />
  );
});

Loader.defaultProps = {
  className: null,
  size: 'md',
};

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export default Loader;
