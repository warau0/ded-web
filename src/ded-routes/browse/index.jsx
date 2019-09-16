import React, { useEffect, useState, useContext } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import Layout from 'ded-components/layout';
import Gallery from 'ded-components/gallery';
import Button from 'ded-components/button';
import { EventContext } from 'ded-context';

import * as styles from './styles.pcss';

export default () => {
  const [getSubmissions, submissionsLoading] = useApi(API.SUBMISSIONS.INDEX);
  const [submissions, setSubmissions] = useState([]);
  const [paginator, setPaginator] = useState(null);

  const [lastEvent] = useContext(EventContext);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_GALLERY) {
      getSubmissions(1).then((res) => {
        setPaginator(res.submissions);
        setSubmissions(res.submissions.data);
      });
    }
  }, [lastEvent]);

  useEffect(() => {
    getSubmissions(1).then((res) => {
      setPaginator(res.submissions);
      setSubmissions(res.submissions.data);
    });
  }, []);

  const _loadMore = () => {
    getSubmissions(paginator.current_page + 1).then((res) => {
      setPaginator(res.submissions);
      setSubmissions(submissions.concat(res.submissions.data));
    });
  };

  return (
    <Layout>
      <div className={styles.galleryContainer}>
        <Gallery
          submissions={submissions}
          loading={submissionsLoading}
        />

        {paginator && paginator.next_page_url && !submissionsLoading && (
          <div className={styles.moreButtonContainer}>
            <Button
              aria-label='Load more'
              round
              brand='base'
              className={styles.moreButton}
              noPadding
              onClick={_loadMore}
            >
              <KeyboardArrowDown />
            </Button>
          </div>
        )}

        {submissions.length > 0 && paginator && !paginator.next_page_url && (
          <i className={styles.theEndLabel}>This is the end.</i>
        )}
      </div>
    </Layout>
  );
};
