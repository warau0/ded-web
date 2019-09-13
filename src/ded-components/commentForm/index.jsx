import React, {
  memo,
  useContext,
  useState,
  useRef,
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

  const fileInput = useRef(null);

  const [theme] = useContext(ThemeContext);
  const [_, fireEvent] = useContext(EventContext);
  const [
    postComment, postCommentLoading,
    postCommentError, clearPostCommentError,
    setCommentError,
  ] = useApi(postUrl);

  const _postComment = () => {
    clearPostCommentError();
    const file = fileInput.current.files[0];

    if (file) {
      const mb = parseFloat(file.size / 1024 / 1024).toFixed(2);
      const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (fileTypes.indexOf(file.type) === -1) {
        setCommentError(`${file.name} is not an image (jpg, png, gif).`);
        fileInput.current.value = null;
        return;
      }

      if (mb > 3) {
        setCommentError(`${file.name} is too big: ${mb} MB, max: 3 MB.`);
        fileInput.current.value = null;
        return;
      }
    }

    const uploadForm = new FormData();
    uploadForm.append('has_data', 1); // Track if backend receives data.
    uploadForm.append('text', text);
    uploadForm.append('anonymous', anonymous ? 1 : 0);
    if (file) {
      uploadForm.append('image', file);
    }

    postComment(urlTargetId, uploadForm, false).then(() => {
      setText('');
      fireEvent(EVENT.UPDATE_COMMENTS);
      fileInput.current.value = null;
    }).catch(() => {
      fileInput.current.value = null;
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
            ? 'Be the first to comment'
            : 'Join the conversation'
        }
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <ErrorMessage error={postCommentError} />

      <div className={styles.actions}>
        <div className={styles.options}>
          <input className={styles.fileInput} type='file' ref={fileInput} />
          <label htmlFor='anonymous' className={styles.checkbox}>
            <input
              type='checkbox'
              id='anonymous'
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            Anonymous
          </label>
        </div>

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
