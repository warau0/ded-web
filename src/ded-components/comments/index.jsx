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

import { API } from 'ded-constants';
import { ThemeContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import Button from 'ded-components/button';
import CommentForm from 'ded-components/commentForm';

import * as styles from './styles.pcss';

const indentDepth = 3;

const Comments = memo(({ className, comments, level }) => {
  const [replyingId, setReplyingId] = useState(null);
  const [theme] = useContext(ThemeContext);
  const levels = useMemo(() => Array.from(Array(level), (_, i) => i + 1), [level]);

  const _startReply = (id) => {
    if (id === replyingId) {
      setReplyingId(null);
    } else {
      setReplyingId(id);
    }
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
                  <Link to={`/user/${comment.user.id}`} className={styles.username}>
                    <img
                      src={comment.user.avatar
                        ? comment.user.avatar.url.replace('{userID}', comment.user.id)
                        : defaultAvatar
                      }
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
              <Button onClick={() => _startReply(comment.id)} brand='ghost' noPadding plainFocus>
                <Reply className={styles.replyButton} />
              </Button>
            </div>
            <p className={styles.content}>{comment.text}</p>
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
