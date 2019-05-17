import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './styles.pcss'

import { LoginProvider } from 'context/loginContext';
import { ThemeProvider } from 'context/themeContext';

import Error from 'components/error';
import Header from 'components/header';
import Wrapper from 'components/wrapper';
import Routes from './routes';

const App = () => (
  <BrowserRouter>
    <LoginProvider>
      <ThemeProvider>
        <Header />

        <Wrapper>
          <Error>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes />
            </Suspense>
          </Error>
        </Wrapper>
      </ThemeProvider>
    </LoginProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
