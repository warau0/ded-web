import React, { Fragment, useState, useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Loader from 'ded-components/loader';

import styles from './styles.pcss';

const UploadPreview = ({ images }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const newPreviews = previews;
    images.forEach((image) => {
      const id = `${image.name}:${image.size}`;
      if (!newPreviews[id]) {
        newPreviews[id] = image;
        newPreviews[id].id = id;

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.getElementById(id);
          const loader = document.getElementById(`${id}:loader`);

          img.src = e.target.result;
          img.style.display = 'inline-block';
          loader.style.display = 'none';
        };
        reader.readAsDataURL(image);
      }
    });

    setPreviews(newPreviews);
  }, [images, previews]);

  return (
    <div
      className={cn(styles.imageList, { [styles.hasContent]: images.length > 0 })}
      onDrop={e => e.preventDefault()}
    >
      {images.map((image) => {
        const id = `${image.name}:${image.size}`;
        return (
          <Fragment key={id}>
            <img
              id={id}
              alt={image.name}
              className={styles.thumbPreview}
            />
            <Loader
              id={`${id}:loader`}
              alt={image.name}
              className={styles.thumbLoader}
              size='sm'
            />
          </Fragment>
        );
      })}
    </div>
  );
};

UploadPreview.defaultProps = {
  images: [],
};

UploadPreview.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
  })),
};

export default UploadPreview;
