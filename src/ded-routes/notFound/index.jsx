import React from 'react';

import * as styles from './styles.pcss';

export default () => (
  <div className={styles.notFound}>
    <h1>404</h1>
    <div>{'This page doesn\'t exist.'}</div>
  </div>
);
