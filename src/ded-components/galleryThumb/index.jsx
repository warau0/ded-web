import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Filter from '@material-ui/icons/Filter';

import { nsfw } from 'ded-assets';
import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const GalleryThumb = memo(({
  submissionId,
  name,
  url,
  multi,
  hidden,
}) => {
  const [theme] = useContext(ThemeContext);

  return (
    <Link
      to={`/submission/${submissionId}`}
      className={cn(styles.thumb, styles[theme], {
        [styles.hidden]: hidden,
      })}
    >
      {multi && <Filter className={styles.multi} />}
      {hidden && <img className={styles.nsfwOverlay} src={nsfw} alt='nsfw' />}
      <img
        src={url}
        alt={name}
        className={cn({ [styles.nsfw]: hidden })}
      />
    </Link>
  );
});

GalleryThumb.defaultProps = {
  submissionId: null,
  name: null,
  url: null,
  multi: false,
  hidden: false,
};

GalleryThumb.propTypes = {
  submissionId: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  multi: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default GalleryThumb;
