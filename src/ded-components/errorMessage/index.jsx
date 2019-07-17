import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

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
      <ErrorOutline />
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
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default ErrorMessage;
