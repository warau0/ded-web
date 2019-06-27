import React from 'react';

import Layout from 'ded-components/layout';
import Schedule from 'ded-components/schedule';
import Gallery from 'ded-components/gallery';

import * as styles from './styles.pcss';

export default () => (
  <>
    <Layout>
      <Schedule />
    </Layout>

    <div className={styles.galleryContainer}>
      <Gallery />
    </div>
  </>
);
