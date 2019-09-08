import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GalleryThumb from 'ded-components/galleryThumb';
import Loader from 'ded-components/loader';
import { STORAGE } from 'ded-constants';

import * as styles from './styles.pcss';

const Gallery = memo(({
  big,
  small,
  loading,
  submissions,
  padEmptyLabel,
}) => {
  const showNsfw = useMemo(() => JSON.parse(
    localStorage.getItem(STORAGE.SETTINGS_SHOW_NSFW) || false,
  ), []);

  return (
    <>
      <div className={cn(styles.gallery, {
        [styles.mosaic]: !big && !small,
        [styles.triples]: small,
      })}
      >
        {!loading && submissions.length === 0 && (
          <i className={cn(styles.emptyLabel, { [styles.pad]: padEmptyLabel })}>
            No submissions yet :(
          </i>
        )}

        {submissions.filter(s => s.images[0] && s.images[0].thumbnail).map(submission => (
          <GalleryThumb
            hidden={submission.nsfw && !showNsfw}
            key={submission.id}
            submissionId={submission.id}
            name={submission.images[0].thumbnail.file}
            url={submission.images[0].thumbnail.url}
            multi={submission.images.length > 1}
          />
        ))}
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}
    </>
  );
});

Gallery.defaultProps = {
  big: false,
  small: false,
  loading: false,
  submissions: [],
  padEmptyLabel: false,
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
  padEmptyLabel: PropTypes.bool,
};

export default Gallery;
