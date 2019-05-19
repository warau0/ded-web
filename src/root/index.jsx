import '@babel/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles.pcss';

import { ThemeProvider, LoginProvider } from 'ded-context';

import Error from 'ded-components/error';
import Header from 'ded-components/header';
import Wrapper from 'ded-components/wrapper';
import Routes from './routes';

const App = () => (
  <BrowserRouter>
    <LoginProvider>
      <ThemeProvider>
        <Error>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <Wrapper>
              <Routes />
            </Wrapper>
          </Suspense>
        </Error>
      </ThemeProvider>
    </LoginProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
