import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { loader } from 'ded-assets';

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
          document.getElementById(id).src = e.target.result;
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
          <img
            key={id}
            id={id}
            src={loader}
            alt={image.name}
            className={styles.thumbPreview}
          />
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
