import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import config from '../../../config.json';

function init(r) {
  window.GoogleAnalyticsObject = r;
  window[r] = window[r] || function initga(...args) {
    (window[r].q = window[r].q || []).push(args);
  };
  window[r].l = 1 * new Date();
  const a = document.createElement('script');
  const m = document.getElementsByTagName('script')[0];

  a.async = 1;
  a.src = 'https://www.google-analytics.com/analytics.js';
  m.parentNode.insertBefore(a, m);
}

export default () => {
  useEffect(() => {
    if (!config.GA_ID) return;
    init('ga');

    window.ga('create', config.GA_ID, 'auto');
    window.ga('send', 'pageview');
  }, []);

  return (
    <Route
      path='/'
      render={({ location }) => {
        if (typeof window.ga === 'function') {
          window.ga('set', 'page', location.pathname);
          window.ga('send', 'pageview');
        }
        return null;
      }}
    />
  );
};
