import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GalleryThumb from 'ded-components/galleryThumb';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

const Gallery = memo(({
  big,
  small,
  loading,
  submissions,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={cn(styles.gallery, {
      [styles.mosaic]: !big && !small,
      [styles.triples]: small,
    })}
    >
      {submissions.length === 0 && (
        <i className={styles.emptyLabel}>
          No submissions yet :(
        </i>
      )}

      {submissions.filter(s => s.images[0] && s.images[0].thumbnail).map(submission => (
        <GalleryThumb
          key={submission.id}
          submissionId={submission.id}
          name={submission.images[0].thumbnail.file}
          url={submission.images[0].thumbnail.url}
          multi={submission.images.length > 1}
        />
      ))}
    </div>
  );
});

Gallery.defaultProps = {
  big: false,
  small: false,
  loading: false,
  submissions: [],
};

Gallery.propTypes = {
  big: PropTypes.bool,
  small: PropTypes.bool,
  loading: PropTypes.bool,
  submissions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({
      thumbnail: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    })),
  })),
};

export default Gallery;
