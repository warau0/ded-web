import React, { useContext, lazy } from 'react';
import { Route } from "react-router-dom";

import { LoginContext } from 'context/loginContext';

const Intro = lazy(() => import('routes/intro'));
const Dashboard = lazy(() => import('routes/dashboard'));
const Profile = lazy(() => import('routes/profile'));

export default () => {
  const [isLoggedIn] = useContext(LoginContext);

  return (
    <>
      {isLoggedIn
        ? <Route path="/" exact component={Dashboard} />
        : <Route path="/" exact component={Intro} />
      }
      <Route path="/profile" component={Profile} />
    </>
  );
};
