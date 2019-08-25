import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Filter from '@material-ui/icons/Filter';

import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const GalleryThumb = memo(({
  submissionId,
  name,
  url,
  multi,
}) => {
  const [theme] = useContext(ThemeContext);

  return (
    <Link to={`/submission/${submissionId}`} className={cn(styles.thumb, styles[theme])}>
      {multi && <Filter className={styles.multi} />}
      <img
        src={url}
        alt={name}
      />
    </Link>
  );
});

GalleryThumb.defaultProps = {
  submissionId: null,
  name: null,
  url: null,
  multi: false,
};

GalleryThumb.propTypes = {
  submissionId: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  multi: PropTypes.bool,
};

export default GalleryThumb;
