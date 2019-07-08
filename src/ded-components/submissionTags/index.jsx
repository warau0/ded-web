import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const SubmissionTags = memo(({ className, tags }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div
      className={cn(
        styles.tags,
        styles[theme],
        { [className]: className },
      )}
    >
      Tags:
      {JSON.stringify(tags)}
    </div>
  );
});

SubmissionTags.defaultProps = {
  className: null,
  tags: [],
};

SubmissionTags.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  })),
};

export default SubmissionTags;
