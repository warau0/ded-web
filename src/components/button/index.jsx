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
  ...restProps
}) => {
  console.log('Render <Button />', text);
  return (
    <button
      className={cn(styles.button, {
        [styles[brand]]: brand,
        [styles.square]: square,
        [styles.plainText]: plainText,
        [styles.hideOutline]: !plainFocus,
        [className]: className,
      })}
      {...restProps}
    >
      {text ? text : children}
    </button>
  );
});

Button.defaultProps = {
  brand: 'base',
  square: false,
  plainFocus: false,
};

export default Button;