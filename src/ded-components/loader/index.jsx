import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Loader = memo(({ className, ...restProps }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div
      className={cn(
        styles.loader,
        styles[theme],
        { [className]: className },
      )}
      {...restProps}
    />
  );
});

Loader.defaultProps = {
  className: null,
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
