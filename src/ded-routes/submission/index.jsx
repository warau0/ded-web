import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import { fullscreen as fullscreenIcon, cross as crossIcon, defaultAvatar } from 'ded-assets';
import { ThemeContext } from 'ded-context';
import Loader from 'ded-components/loader';
import SubmissionTags from 'ded-components/submissionTags';
import Comments from 'ded-components/comments';

import * as styles from './styles.pcss';

// TODO Close/navigate back and scroll to previous position

const Submission = ({ match }) => {
  const [getSubmission, submissionLoading] = useApi(API.SUBMISSIONS.SHOW);
  const [submission, setSubmission] = useState(null);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    getSubmission(match.params.id).then(res => setSubmission({
      ...res.submission,
      posted_at: moment(res.submission.created_at).fromNow(),
    }));
  }, []);

  if (submissionLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className={cn(styles.errorContainer, styles[theme])}>
        <div>
          <img src={crossIcon} draggable='false' alt='Error' />
        </div>
        <div>{'This submission is either private or doesn\'t exist.'}</div>
      </div>
    );
  }

  return (
    <div className={cn(styles.submissionContainer, styles[theme])}>
      <div className={cn(styles.images, { [styles.single]: submission.images.length === 1 })}>
        {submission.images.map((image) => {
          const url = image.url.replace('{userID}', submission.user.id);
          return (
            <div className={styles.art} key={image.id}>
              <img src={url} draggable='false' alt={image.name} />
              <div className={styles.actions}>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={url}
                  className={styles.action}
                >
                  <img src={fullscreenIcon} alt='open' />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.infoContainer}>
        <Link className={styles.user} to={`/user/${submission.user.id}`}>
          <img src={defaultAvatar} className={styles.avatar} alt='avatar' />
          <div className={styles.username}>{submission.user.username}</div>
        </Link>

        <div className={styles.times}>
          <p className={styles.timestamp} data-tip={submission.created_at}>
            Posted
            <b>{` ${submission.posted_at}`}</b>
          </p>
          <ReactTooltip />

          {submission.hours > 0 && (
            <p className={styles.timestamp}>
              Spent
              <b>{` ${submission.hours} hours`}</b>
            </p>
          )}
        </div>

        {submission.description && <p className={styles.description}>{submission.description}</p>}

        <SubmissionTags tags={submission.tags} />

        <h4 className={styles.commentsTitle}>Comments</h4>
        <Comments comments={submission.comments} />
      </div>
    </div>
  );
};

Submission.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Submission;
