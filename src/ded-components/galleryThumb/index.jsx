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
  userId,
}) => {
  const [theme] = useContext(ThemeContext);

  return (
    <Link to={`/submission/${submissionId}`} className={cn(styles.thumb, styles[theme])}>
      {multi && <Filter className={styles.multi} />}
      <img
        src={url.replace('{userID}', userId)}
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
  userId: null,
};

GalleryThumb.propTypes = {
  submissionId: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  multi: PropTypes.bool,
  userId: PropTypes.number,
};

export default GalleryThumb;
