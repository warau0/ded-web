import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { STORAGE } from 'ded-constants';

const LoginContext = createContext([false, () => {}]);

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(STORAGE.TOKEN) || false);

  const saveIsLoggedIn = (token) => {
    if (token) {
      localStorage.setItem(STORAGE.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE.TOKEN);
    }
    setIsLoggedIn(!!token);
  };

  return (
    <LoginContext.Provider value={[isLoggedIn, saveIsLoggedIn]}>
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { LoginContext, LoginProvider };
