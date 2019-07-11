import React, { useEffect, useState, useContext } from 'react';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import Layout from 'ded-components/layout';
import Schedule from 'ded-components/schedule';
import Leaderboard from 'ded-components/leaderboard';
import Gallery from 'ded-components/gallery';
import { EventContext } from 'ded-context';

import * as styles from './styles.pcss';

export default () => {
  const [getSubmissions, submissionsLoading] = useApi(API.SUBMISSIONS.INDEX);
  const [submissions, setSubmissions] = useState([]);

  const [lastEvent, _, consumeEvent] = useContext(EventContext);

  useEffect(() => {
    if (lastEvent === EVENT.UPDATE_GALLERY) {
      consumeEvent();
      getSubmissions().then(res => setSubmissions(res.submissions));
    }
  }, [lastEvent]);

  useEffect(() => {
    getSubmissions().then(res => setSubmissions(res.submissions));
  }, []);

  return (
    <>
      <Layout>
        <Schedule />

        <div className={styles.row}>
          <div className={styles.somePlaceholder}>WIP</div>
          <Leaderboard className={styles.leaderboard} />
        </div>
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
