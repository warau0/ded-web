import React, { memo, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Button = memo(({
  children,
  brand,
  className,
  square,
  round,
  plainText,
  text,
  plainFocus,
  loading,
  type,
  noPadding,
  ...restProps
}) => {
  const [theme] = useContext(ThemeContext);

  return (
    /* Linter does not understand oneOfType prop */
    /* eslint-disable-next-line react/button-has-type */
    <button
      className={cn(styles.button, styles[theme], {
        [styles[brand]]: brand,
        [styles.square]: square,
        [styles.round]: round,
        [styles.plainText]: plainText,
        [styles.hideOutline]: !plainFocus,
        [styles.noPadding]: noPadding,
        [className]: className,
      })}
      type={type}
      disabled={loading}
      {...restProps}
    >
      {loading ? 'Please wait ...' : (text || children)}
    </button>
  );
});

Button.defaultProps = {
  brand: 'base',
  square: false,
  round: false,
  plainFocus: false,
  plainText: false,
  children: null,
  type: 'button',
  text: null,
  loading: false,
  className: null,
  noPadding: false,
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  brand: PropTypes.oneOf(['base', 'ghost', 'white', 'success', 'mono']),
  className: PropTypes.string,
  square: PropTypes.bool,
  round: PropTypes.bool,
  plainText: PropTypes.bool,
  text: PropTypes.string,
  plainFocus: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  noPadding: PropTypes.bool,
};

export default Button;
