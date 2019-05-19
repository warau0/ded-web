import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import icon from 'assets/error.png';

import * as styles from './styles.pcss';

const ErrorMessage = memo(({
  className,
  error,
}) => {
  if (!error) return null;

  return (
    <div className={cn(styles.error, {
      [className]: className,
    })}
    >
      <img className={styles.icon} src={icon} alt='Error' />
      <div>
        {Array.isArray(error) ? (error.map(o => <p key={o}>{o}</p>)) : <p>{error}</p>}
      </div>
    </div>
  );
});

ErrorMessage.defaultProps = {
  className: null,
  error: null,
};

ErrorMessage.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default ErrorMessage;
