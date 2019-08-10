import '@babel/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider, LoginProvider, EventProvider } from 'ded-context';

import PageCrash from 'ded-components/pageCrash';
import Header from 'ded-components/header';
import Wrapper from 'ded-components/wrapper';
import Authenticate from 'ded-components/authenticate';
import Tracker from 'ded-components/tracker';
import Timer from 'ded-components/timer';

import Routes from './routes';
import './styles.pcss';

const App = () => (
  <BrowserRouter>
    <EventProvider>
      <LoginProvider>
        <ThemeProvider>
          <PageCrash>
            <Authenticate>
              <Suspense fallback={null}>
                <Header />
              </Suspense>

              <Suspense fallback={<div>Loading...</div>}>
                <Wrapper>
                  <Routes />

                  <Timer />

                  <ToastContainer
                    position='top-center'
                    autoClose={5000}
                  />
                </Wrapper>
              </Suspense>
            </Authenticate>
          </PageCrash>
        </ThemeProvider>
      </LoginProvider>
    </EventProvider>
    <Tracker />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
