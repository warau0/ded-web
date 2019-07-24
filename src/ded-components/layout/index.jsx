import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as styles from './styles.pcss';

const Layout = memo(({ children, className, ...restProps }) => {
  return (
    <div
      className={cn(styles.layout, {
        [className]: className,
      })}
      {...restProps}
    >
      {children}
    </div>
  );
});

Layout.defaultProps = {
  className: null,
  children: [],
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Layout;
