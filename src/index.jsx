import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

import Error from './modules/error';

const Dashboard = lazy(() => import('./modules/dashboard'));
const Profile = lazy(() => import('./modules/profile'));

const App = () => (
  <BrowserRouter>
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>

    <Error>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" exact component={Dashboard} />
        <Route path="/profile" component={Profile} />
      </Suspense>
    </Error>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
