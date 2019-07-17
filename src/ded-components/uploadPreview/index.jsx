import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';

import Loader from 'ded-components/loader';
import Button from 'ded-components/button';

import styles from './styles.pcss';

const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => set(!value);
};
let updater = null;

const UploadPreview = ({ images, onDelete }) => {
  const [previews, setPreviews] = useState([]);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const newPreviews = previews;
    images.forEach((image) => {
      const id = `${image.name}:${image.size}`;
      if (!newPreviews[id]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews[id] = image;
          newPreviews[id].id = id;
          newPreviews[id].src = e.target.result;
          clearTimeout(updater);
          updater = setTimeout(() => {
            setPreviews(newPreviews);
            setTimeout(forceUpdate, 500);
          }, 500);
        };
        reader.readAsDataURL(image);
      }
    });
  }, [images, previews]);

  const deleteImage = (image) => {
    onDelete(image);
    const newPreviews = previews;
    delete newPreviews[image];
    setPreviews(newPreviews);
  };

  return (
    <div
      className={cn(styles.imageList, { [styles.hasContent]: images.length > 0 })}
      onDrop={e => e.preventDefault()}
    >
      {images.map((image) => {
        const id = `${image.name}:${image.size}`;
        const preview = previews[id];
        return (
          <div key={id} className={styles.imageContainer}>
            {preview ? (
              <>
                <img
                  id={preview.id}
                  alt={preview.name}
                  className={styles.thumbPreview}
                  src={preview.src}
                />
                <div className={styles.deleteButtonContainer}>
                  <Button
                    brand='ghost'
                    noPadding
                    className={styles.deleteButton}
                    onClick={() => deleteImage(preview.id)}
                  >
                    <Close />
                  </Button>
                </div>
              </>
            ) : (
              <Loader
                alt='Loading'
                className={styles.thumbLoader}
                size='sm'
              />
            )}
          </div>
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
  onDelete: PropTypes.func.isRequired,
};

export default UploadPreview;
