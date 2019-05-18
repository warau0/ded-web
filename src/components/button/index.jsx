import React, { memo } from 'react';
import cn from 'classnames';

import * as styles from './styles.pcss';

const Button = memo(({
  children,
  brand,
  className,
  square,
  plainText,
  text,
  plainFocus,
  loading,
  ...restProps
}) => {
  return (
    <button
      className={cn(styles.button, {
        [styles[brand]]: brand,
        [styles.square]: square,
        [styles.plainText]: plainText,
        [styles.hideOutline]: !plainFocus,
        [className]: className,
      })}
      disabled={loading}
      {...restProps}
    >
      {loading ? 'Please wait ...' : (text ? text : children)}
    </button>
  );
});

Button.defaultProps = {
  brand: 'base',
  square: false,
  plainFocus: false,
};

export default Button;