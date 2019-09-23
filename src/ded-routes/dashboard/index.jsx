import React, { useEffect, useState, useContext } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import cn from 'classnames';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import Layout from 'ded-components/layout';
import Schedule from 'ded-components/schedule';
import Leaderboard from 'ded-components/leaderboard';
import Gallery from 'ded-components/gallery';
import Button from 'ded-components/button';
import { ThemeContext, EventContext } from 'ded-context';

import * as styles from './styles.pcss';

/* eslint-disable react/jsx-curly-brace-presence */
export default () => {
  const [getSubmissions, submissionsLoading] = useApi(API.SUBMISSIONS.FOLLOWED_INDEX);
  const [submissions, setSubmissions] = useState([]);
  const [follows, setFollows] = useState([]);
  const [paginator, setPaginator] = useState(null);

  const [lastEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  const _getSubmissions = (page) => {
    getSubmissions(page).then((res) => {
      setPaginator(res.submissions);
      setFollows(res.followed);
      setSubmissions(submissions.concat(res.submissions.data));
    });
  };

  const _loadMore = () => {
    _getSubmissions(paginator.current_page + 1);
  };

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_GALLERY) {
      _getSubmissions(1);
    }
  }, [lastEvent]);

  useEffect(() => {
    _getSubmissions(1);
  }, []);

  return (
    <>
      <Layout>
        <Schedule />

        <div className={styles.row}>
          <div className={cn(styles.inDev, styles[theme])}>
            {/* eslint-disable max-len */}
            <p>{`Hi! This website is still under development in a big way!`}</p>
            <p>{`I'm still unsure about many aspect of this website. I do know however, in it's purest form, you can post images and form a gallery of sorts. This part of the website is done - What's left is all the extra bits.`}</p>
            <p>
              {`If you would like a look at the list of things I'm working on / want to work on, you can find that here: `}
              <a target='_blank' rel='noopener noreferrer' href='https://trello.com/b/S5bC886G/ded'>Trello board</a>
            </p>
            {/* eslint-enable max-len */}
          </div>
          <Leaderboard className={styles.leaderboard} />
        </div>
      </Layout>

      <div className={styles.galleryContainer}>
        {(submissionsLoading || (submissions && follows.length > 0)) && (
          <Gallery
            submissions={submissions}
            loading={submissionsLoading}
          />
        )}

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

        {!submissionsLoading && follows.length === 0 && (
          <i className={styles.theEndLabel}>Follow someone to have their submissions show up here!</i>
        )}

        {submissions.length > 0 && paginator && !paginator.next_page_url && (
          <i className={styles.theEndLabel}>This is the end.</i>
        )}
      </div>
    </>
  );
};
