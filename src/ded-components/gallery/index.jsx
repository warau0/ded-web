import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GalleryThumb from 'ded-components/galleryThumb';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

const Gallery = memo(({ big, loading, submissions }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={cn(styles.gallery, {
      [styles.mosaic]: !big,
    })}
    >
      {submissions.length === 0 && (
        <i className={styles.emptyLabel}>
          {'There aren\'t any images here yet :('}
        </i>
      )}

      {submissions.map(submission => (
        <GalleryThumb
          key={submission.id}
          submissionId={submission.id}
          name={submission.images[0].thumbnail.name}
          url={submission.images[0].thumbnail.url}
          userId={submission.user_id}
          multi={submission.images.length > 1}
        />
      ))}
    </div>
  );
});

Gallery.defaultProps = {
  big: false,
  loading: false,
  submissions: [],
};

Gallery.propTypes = {
  big: PropTypes.bool,
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
