import "@babel/polyfill";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './styles.pcss'

import { ThemeProvider, LoginProvider } from 'context';

import Error from 'components/error';
import Header from 'components/header';
import Wrapper from 'components/wrapper';
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
