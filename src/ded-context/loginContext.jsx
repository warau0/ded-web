import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { STORAGE } from 'ded-constants';
import parseJWT from 'ded-utils/parseJWT';

const LoginContext = createContext([false, () => {}]);

const LoginProvider = ({ children }) => {
  const localToken = localStorage.getItem(STORAGE.TOKEN);
  const [isLoggedIn, setIsLoggedIn] = useState(localToken || false);
  const [user, setUser] = useState(localToken ? parseJWT(localToken) : null);

  const saveIsLoggedIn = (token) => {
    if (token) {
      localStorage.setItem(STORAGE.TOKEN, token);
      setUser(parseJWT(token));
    } else {
      localStorage.removeItem(STORAGE.TOKEN);
      setUser(null);
    }
    setIsLoggedIn(!!token);
  };

  return (
    <LoginContext.Provider value={[isLoggedIn, user, saveIsLoggedIn]}>
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
