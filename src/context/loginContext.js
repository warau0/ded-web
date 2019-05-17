import React, { useState, createContext } from 'react';

import { STORAGE } from 'constants';

const LoginContext = createContext([false, () => {}]);

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(STORAGE.TOKEN) || false);

  const saveIsLoggedIn = token => {
    if (token) {
      localStorage.setItem(STORAGE.TOKEN, value);
    } else {
      localStorage.removeItem(STORAGE.TOKEN);
    }
    setIsLoggedIn(token);
  };

  return (
    <LoginContext.Provider value={[isLoggedIn, saveIsLoggedIn]}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };