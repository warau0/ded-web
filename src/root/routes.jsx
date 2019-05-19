import React, { useContext, lazy } from 'react';
import { Route } from 'react-router-dom';

import { LoginContext } from 'ded-context';

const Intro = lazy(() => import('ded-routes/intro'));
const Dashboard = lazy(() => import('ded-routes/dashboard'));
const Profile = lazy(() => import('ded-routes/profile'));

export default () => {
  const [isLoggedIn] = useContext(LoginContext);

  return (
    <>
      {isLoggedIn
        ? <Route path='/' exact component={Dashboard} />
        : <Route path='/' exact component={Intro} />
      }
      <Route path='/profile' component={Profile} />
    </>
  );
};
