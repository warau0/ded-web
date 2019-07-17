import React, {
  memo,
  useContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext, EventContext } from 'ded-context';
import { EVENT } from 'ded-constants';
import Button from 'ded-components/button';
import ErrorMessage from 'ded-components/errorMessage';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

const CommentForm = memo(({
  replyCount,
  postUrl,
  urlTargetId,
  isReplying,
}) => {
  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [theme] = useContext(ThemeContext);
  const [_, fireEvent] = useContext(EventContext);
  const [
    postComment, postCommentLoading,
    postCommentError, clearPostCommentError,
  ] = useApi(postUrl);

  const _postComment = () => {
    clearPostCommentError();
    postComment(urlTargetId, { anonymous, text })
      .then(() => {
        fireEvent(EVENT.UPDATE_COMMENTS);
        setText('');
        setAnonymous(false);
      });
  };

  return (
    <div className={cn(styles.reply, styles[theme])}>
      <textarea
        maxLength={5000}
        className={cn(styles.textarea, {
          [styles.expanded]: text.length > 0,
        })}
        placeholder={isReplying
          ? 'Reply'
          : replyCount === 0
            ? 'Be the first to reply'
            : 'Join the conversation'
        }
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <ErrorMessage error={postCommentError} />

      <div className={styles.actions}>
        <label htmlFor='anonymous' className={styles.checkbox}>
          <input
            type='checkbox'
            id='anonymous'
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Anonymous
        </label>
        <Button
          onClick={_postComment}
          text='Submit'
          square
          brand='success'
          className={styles.submit}
          loading={postCommentLoading}
          disabled={text.length === 0}
        />
      </div>
    </div>
  );
});

CommentForm.defaultProps = {
  replyCount: 0,
  postUrl: null,
  urlTargetId: null,
  isReplying: false,
};

CommentForm.propTypes = {
  replyCount: PropTypes.number,
  postUrl: PropTypes.shape({
    METHOD: PropTypes.string,
    URL: PropTypes.func,
  }),
  urlTargetId: PropTypes.number,
  isReplying: PropTypes.bool,
};

export default CommentForm;
