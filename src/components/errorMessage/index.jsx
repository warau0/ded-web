import React, { memo } from 'react';
import cn from 'classnames';

import icon from 'assets/error.png';

import * as styles from './styles.pcss';

const Button = memo(({
  className,
  error,
}) => {
  if (!error) return null;

  return (
    <div className={cn(styles.error, {
      [className]: className,
    })}>
      <img className={styles.icon} src={icon} />
      <div>
        {Array.isArray(error) ? (error.map(o => <p key={o}>{o}</p>)) : <p>{error}</p>}
      </div>
    </div>
  );
});

export default Button;