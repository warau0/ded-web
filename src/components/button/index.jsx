import React from 'react';
import cn from 'classnames';

import * as styles from './styles.pcss';

export default ({ children, className, ...restProps }) => (
  <button
    className={cn(styles.button, {
      [className]: className,
    })}
    {...restProps}
  >
    {children}
  </button>
);
