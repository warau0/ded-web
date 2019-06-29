import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import GalleryThumb from 'ded-components/galleryThumb';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

const Gallery = memo(({ big }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.SUBMISSIONS.GET);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions().then(res => setSubmissions(res.submissions));
  }, []);

  if (submissionsLoading) {
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
};

Gallery.propTypes = {
  big: PropTypes.bool,
};

export default Gallery;
