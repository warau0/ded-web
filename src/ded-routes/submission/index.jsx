import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import { fullscreen as fullscreenIcon, cross as crossIcon, defaultAvatar } from 'ded-assets';
import { ThemeContext } from 'ded-context';
import Loader from 'ded-components/loader';
// import SubmissionTags from 'ded-components/submissionTags';
// import Comments from 'ded-components/comments';

import * as styles from './styles.pcss';

// TODO Close/navigate back and scroll to previous position

const Submission = ({ match }) => {
  const [getSubmission, submissionLoading] = useApi(API.SUBMISSIONS.SHOW);
  const [submission, setSubmission] = useState(null);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    getSubmission(match.params.id).then(res => setSubmission(res.submission));
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
        {submission.description && (
          <div className={styles.description}>{submission.description}</div>
        )}

        Info box not implemented.
        {/*
        {submission.created_at}

        <SubmissionTags tags={submission.tags} />

        <Comments comments={[]} />
        */}
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
