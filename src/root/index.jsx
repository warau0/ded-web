import '@babel/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles.pcss';

import { ThemeProvider, LoginProvider } from 'ded-context';

import PageCrash from 'ded-components/pageCrash';
import Header from 'ded-components/header';
import Wrapper from 'ded-components/wrapper';
import Authenticate from 'ded-components/authenticate';
import Routes from './routes';

const App = () => (
  <BrowserRouter>
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
              </Wrapper>
            </Suspense>
          </Authenticate>
        </PageCrash>
      </ThemeProvider>
    </LoginProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
