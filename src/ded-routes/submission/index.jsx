import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Fullscreen from '@material-ui/icons/Fullscreen';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Info from '@material-ui/icons/Info';
import Close from '@material-ui/icons/Close';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import { cross as crossIcon, defaultAvatar } from 'ded-assets';
import { ThemeContext, EventContext } from 'ded-context';
import Loader from 'ded-components/loader';
import SubmissionTags from 'ded-components/submissionTags';
import Comments from 'ded-components/comments';
import CommentForm from 'ded-components/commentForm';
import Gallery from 'ded-components/gallery';

import * as styles from './styles.pcss';

const Submission = ({ match }) => {
  const [getSubmission, submissionLoading] = useApi(API.SUBMISSIONS.SHOW);
  const [getComments, commentsLoading] = useApi(API.SUBMISSIONS.COMMENTS);
  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([]);
  const [metaInfo, setMetaInfo] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [lastEvent] = useContext(EventContext);

  useEffect(() => {
    getSubmission(match.params.id).then((response) => {
      setSubmission({
        ...response.submission,
        posted_at: moment(response.submission.created_at).fromNow(),
      });

      setMetaInfo({
        user_submissions: response.user_submissions,
        next_submission_id: response.next_submission_id,
        next_user_submission_id: response.next_user_submission_id,
        previous_submission_id: response.previous_submission_id,
        previous_user_submission_id: response.previous_user_submission_id,
      });

      setComments(response.submission.comments);
    });
  }, [match.params.id]);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_COMMENTS) {
      getComments(match.params.id).then(res => setComments(res.comments));
    }
  }, [lastEvent]);

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
        {submission.images.map((image) => (
          <div className={styles.art} key={image.id}>
            <img src={image.url} draggable='false' alt={image.file} />
            <div className={styles.actions}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={image.url}
                className={styles.action}
              >
                <Fullscreen />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.infoContainer}>
        <Link to='/' className={styles.close}><Close /></Link>

        <Link className={styles.user} to={`/user/${submission.user.username}`}>
          <img
            src={submission.user.avatar ? submission.user.avatar.url : defaultAvatar}
            alt='avatar'
            className={styles.avatar}
          />
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
              <b>{` ${submission.hours} hour${submission.hours !== 1 ? 's' : ''}`}</b>
            </p>
          )}
        </div>

        {!!submission.private && (
          <div className={styles.privateInfo}>
            <Info />
            This submission is private, only you can view it.
          </div>
        )}

        {submission.description && <p className={styles.description}>{submission.description}</p>}

        <SubmissionTags tags={submission.tags} />

        {metaInfo && metaInfo.user_submissions && metaInfo.user_submissions.length > 0 && (
          <>
            <h4 className={styles.sectionTitle}>{`More from ${submission.user.username}`}</h4>
            <div className={styles.moreContainer}>
              <Gallery small submissions={metaInfo.user_submissions} />
            </div>
          </>
        )}

        <div className={styles.navigationContainer}>
          <div>
            {metaInfo && metaInfo.previous_submission_id ? (
              <Link to={`/submission/${metaInfo.previous_submission_id}`} data-tip='Previous submission'>
                <KeyboardArrowLeft className={cn(styles.navigationArrow, styles.active)} />
                <ReactTooltip />
              </Link>
            ) : <KeyboardArrowLeft className={styles.navigationArrow} />}
            {metaInfo && metaInfo.next_submission_id ? (
              <Link to={`/submission/${metaInfo.next_submission_id}`} data-tip='Next submission'>
                <KeyboardArrowRight className={cn(styles.navigationArrow, styles.active)} />
                <ReactTooltip />
              </Link>
            ) : <KeyboardArrowRight className={styles.navigationArrow} />}
          </div>

          <div>
            {metaInfo && metaInfo.previous_user_submission_id ? (
              <Link to={`/submission/${metaInfo.previous_user_submission_id}`} data-tip={`${submission.user.username}'s previous submission`}>
                <KeyboardArrowLeft className={cn(styles.navigationArrow, styles.active)} />
                <ReactTooltip />
              </Link>
            ) : <KeyboardArrowLeft className={styles.navigationArrow} />}
            {metaInfo && metaInfo.next_user_submission_id ? (
              <Link to={`/submission/${metaInfo.next_user_submission_id}`} data-tip={`${submission.user.username}'s next submission`}>
                <KeyboardArrowRight className={cn(styles.navigationArrow, styles.active)} />
                <ReactTooltip />
              </Link>
            ) : <KeyboardArrowRight className={styles.navigationArrow} />}
          </div>
        </div>

        <h4 className={styles.sectionTitle}>Comments</h4>
        <CommentForm
          replyCount={comments.length}
          postUrl={API.SUBMISSIONS.POST_COMMENT}
          urlTargetId={submission.id}
        />
        {commentsLoading
          ? (
            <div className={styles.loadingContainer}>
              <Loader />
            </div>
          )
          : <Comments comments={comments} />}
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
