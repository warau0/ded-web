import React, { useEffect, useState } from 'react';

import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import Layout from 'ded-components/layout';
import Schedule from 'ded-components/schedule';
import Gallery from 'ded-components/gallery';

import * as styles from './styles.pcss';

export default () => {
  const [getSubmissions, submissionsLoading] = useApi(API.SUBMISSIONS.GET);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions().then(res => setSubmissions(res.submissions));
  }, []);

  return (
    <>
      <Layout>
        <Schedule />
      </Layout>

      <div className={styles.galleryContainer}>
        <Gallery
          loading={submissionsLoading}
          submissions={submissions}
        />
      </div>
    </>
  );
};
