import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';
import Button from 'ded-components/button';

import * as styles from './styles.pcss';

const SubmissionTags = memo(({ tags, onClick }) => {
  const [theme] = useContext(ThemeContext);

  if (tags.length === 0) return null;

  const Wrapper = onClick ? Button : 'div';

  return (
    <div
      className={cn(
        styles.tags,
        styles[theme],
      )}
    >
      {tags.map(tag => (
        <Wrapper
          key={tag.id}
          className={cn(styles.tag, styles[tag.color])}
          {...onClick && { onClick: () => onClick(tag) }}
          {...onClick && { plainText: true }}
        >
          {tag.text}
        </Wrapper>
      ))}
    </div>
  );
});

SubmissionTags.defaultProps = {
  tags: [],
  onClick: undefined,
};

SubmissionTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

export default SubmissionTags;
