import React from 'react';
import { Link } from 'react-router-dom';

import Layout from 'ded-components/layout';

export default () => {
  return (
    <Layout>
      <Link to='profile'>To profile</Link>
    </Layout>
  );
};
