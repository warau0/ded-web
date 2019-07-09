import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const SubmissionTags = memo(({ tags }) => {
  const [theme] = useContext(ThemeContext);

  if (tags.length === 0) return null;

  return (
    <div
      className={cn(
        styles.tags,
        styles[theme],
      )}
    >
      {tags.map(tag => (
        <div key={tag.id} className={cn(styles.tag, styles[tag.color])}>
          {tag.text}
        </div>
      ))}
    </div>
  );
});

SubmissionTags.defaultProps = {
  tags: [],
};

SubmissionTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  })),
};

export default SubmissionTags;
