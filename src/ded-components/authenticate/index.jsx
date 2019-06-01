import React, { memo, useState, useContext } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';
import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Authenticate = memo(({ children }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  const [verifyToken] = useApi(API.VERIFY_TOKEN);

  const [theme] = useContext(ThemeContext);

  useState(() => {
    verifyToken()
      .then(() => setShowOverlay(false))
      .catch(() => setShowOverlay(false));
  });

  return (
    <>
      <Transition in={showOverlay} timeout={500} unmountOnExit>
        {state => (
          <div
            className={cn(
              styles.loginOverlay,
              styles[state],
              styles[theme],
            )}
          >
            Checking login ...
          </div>
        )}
      </Transition>

      {!showOverlay && children}
    </>
  );
});

Authenticate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Authenticate;
