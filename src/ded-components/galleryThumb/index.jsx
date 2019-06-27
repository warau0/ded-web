import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// import { Link } from 'react-router-dom';

import { ThemeContext } from 'ded-context';
import { imagesBW as imagesBWIcon } from 'ded-assets';

import * as styles from './styles.pcss';

const GalleryThumb = memo(({
  submissionId,
  name,
  url,
  multi,
  userId,
}) => {
  const [theme] = useContext(ThemeContext);

  return ( // TODO Change to Link when image view available.
    <div to={`/image/${submissionId}`} className={cn(styles.thumb, styles[theme])}>
      {multi && <img className={styles.multi} draggable={false} src={imagesBWIcon} alt='multi' />}
      <img
        src={url.replace('{userID}', userId)}
        alt={name}
      />
    </div>
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
