import React, {
  memo,
  useContext,
  Fragment,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Reply from '@material-ui/icons/Reply';
import Edit from '@material-ui/icons/Edit';

import { API, EVENT } from 'ded-constants';
import { ThemeContext, EventContext, LoginContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import Button from 'ded-components/button';
import CommentForm from 'ded-components/commentForm';
import ErrorMessage from 'ded-components/errorMessage';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

const indentDepth = 3;

const Comments = memo(({ className, comments, level }) => {
  const [replyingId, setReplyingId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [_, fireEvent] = useContext(EventContext);
  const [__, loggedInUser] = useContext(LoginContext);
  const [
    putComment, putCommentLoading,
    putCommentError, clearPutCommentError,
  ] = useApi(API.COMMENTS.PUT);

  const levels = useMemo(() => Array.from(Array(level), (___, i) => i + 1), [level]);

  const _startReply = (id) => {
    if (id === replyingId) {
      setReplyingId(null);
    } else {
      setReplyingId(id);
      setEditingComment(null);
    }
  };

  const _startEdit = (comment) => {
    if (editingComment && comment.id === editingComment.id) {
      setEditingComment(null);
    } else {
      setEditingComment(comment);
      setReplyingId(null);
    }
  };

  const _putComment = () => {
    clearPutCommentError();
    putComment(editingComment.id, { text: editingComment.text })
      .then(() => {
        fireEvent(EVENT.UPDATE_COMMENTS);
      });
  };

  return (
    <div
      className={cn(
        styles.comments,
        styles[theme],
        { [className]: className },
      )}
    >
      {comments.map(comment => (
        <Fragment key={comment.id}>
          <div className={styles.comment}>
            <div className={styles.header}>
              <div className={styles.usernameContainer}>
                {level > indentDepth && (
                  <div className={styles.levelContainer}>
                    {levels.map(i => <span key={i} className={styles.level}>•</span>)}
                  </div>
                )}
                {comment.user ? (
                  <Link
                    to={`/user/${comment.user.username}`}
                    className={styles.username}
                  >
                    <img
                      src={comment.user.avatar ? comment.user.avatar.url : defaultAvatar}
                      className={styles.avatar}
                      alt='avatar'
                    />
                    {comment.user.username}
                  </Link>
                ) : (
                  <div className={styles.username}>
                    <img src={defaultAvatar} className={styles.avatar} alt='avatar' />
                    Anonymous
                  </div>
                )}
              </div>
              <div>
                {loggedInUser && loggedInUser.sub === comment.user_id && (
                  <Button onClick={() => _startEdit(comment)} brand='ghost' noPadding plainFocus>
                    <Edit className={styles.editButton} />
                  </Button>
                )}
                <Button onClick={() => _startReply(comment.id)} brand='ghost' noPadding plainFocus>
                  <Reply className={styles.replyButton} />
                </Button>
              </div>
            </div>
            {editingComment && editingComment.id === comment.id ? (
              <>
                <textarea
                  value={editingComment.text}
                  maxLength={5000}
                  className={styles.textarea}
                  placeholder='...'
                  onChange={e => setEditingComment({ ...editingComment, text: e.target.value })}
                />
                <div className={styles.submitContainer}>
                  <Button
                    onClick={_putComment}
                    text='Submit'
                    square
                    brand='success'
                    loading={putCommentLoading}
                    disabled={editingComment.text.length === 0}
                  />
                </div>
                <ErrorMessage error={putCommentError} />
              </>
            ) : (
              <p className={cn(styles.content, { [styles.hasImage]: !!comment.image })}>
                {!!comment.image && (
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={comment.image.url}
                    className={styles.action}
                  >
                    <img
                      align='left'
                      src={comment.image.thumbnail.url}
                      alt={comment.image.thumbnail.file}
                      className={styles.commentImage}
                    />
                  </a>
                )}
                {comment.text}
                {comment.created_at !== comment.updated_at && (
                  <span className={styles.editNote}>&nbsp;(edited)</span>
                )}
                {comment.banned && <strong className={styles.banned}>(USER WAS BANNED FOR THIS POST)</strong>}
              </p>
            )}
          </div>

          {replyingId === comment.id && (
            <div className={cn({ [styles.replyPad]: level <= indentDepth })}>
              <CommentForm
                isReplying
                postUrl={API.COMMENTS.POST}
                urlTargetId={comment.id}
              />
            </div>
          )}

          {comment.comments.length > 0 && <Replies comments={comment.comments} level={level + 1} />}
        </Fragment>
      ))}
      {comments.length === 0 && (
        <i className={styles.emptyLabel}>
          No comments yet :(
        </i>
      )}
    </div>
  );
});

const Replies = ({ level, ...restProps }) => {
  return (
    <div className={cn({ [styles.replyPad]: level <= indentDepth })}>
      <Comments {...restProps} level={level} />
    </div>
  );
};

const defaultProps = {
  className: null,
  comments: [],
  level: 0,
};

const propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  level: PropTypes.number,
};

Replies.defaultProps = defaultProps;
Replies.propTypes = propTypes;
Comments.defaultProps = defaultProps;
Comments.propTypes = propTypes;

export default Comments;
