import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Comments = memo(({ className, comments }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div
      className={cn(
        styles.comments,
        styles[theme],
        { [className]: className },
      )}
    >
      Comments:
      {JSON.stringify(comments)}
    </div>
  );
});

Comments.defaultProps = {
  className: null,
  comments: [],
};

Comments.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

export default Comments;
