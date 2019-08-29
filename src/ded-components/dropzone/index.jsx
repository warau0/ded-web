import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { images as imagesIcon } from 'ded-assets';
import { ThemeContext } from 'ded-context';

import styles from './styles.pcss';

const Dropzone = ({
  disabled,
  onFilesAdded,
  onError,
  fileTypes,
  images,
  maxLength,
}) => {
  const [highlight, setHighlight] = useState(false);
  const [theme] = useContext(ThemeContext);

  const fileInputRef = useRef(null);

  const _fileListToArray = (list) => {
    const array = [];
    const imageIDs = images.map(img => `${img.name}:${img.size}`);
    for (let i = 0; i < list.length; i += 1) {
      if (fileTypes.indexOf(list[i].type) !== -1) {
        const imageID = `${list[i].name}:${list[i].size}`;
        if (imageIDs.indexOf(imageID) === -1) {
          array.push(list.item(i));
        } else {
          onError(`${list[i].name} has already been added.`);
        }
      } else {
        onError(`${list[i].name} is not an image (jpg, png, gif).`);
      }
    }
    return array.slice(0, (maxLength - images.length) || 0);
  };

  const _onChange = (evt) => {
    if (disabled) return;

    const { files } = evt.target;
    onFilesAdded(_fileListToArray(files));
  };

  const _onDragOver = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const _onDragLeave = () => {
    setHighlight(false);
  };

  const _onDrop = (event) => {
    event.preventDefault();
    if (disabled) return;

    const { files } = event.dataTransfer;
    onFilesAdded(_fileListToArray(files));
    setHighlight(false);
  };

  const _openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  return (
    <div className={cn(styles.container, styles[theme])}>
      <div
        role='presentation'
        className={cn(styles.dropzone, {
          [styles.highlight]: highlight || images.length > 0,
          [styles.compact]: images.length > 0,
        })}
        onDragOver={_onDragOver}
        onDragLeave={_onDragLeave}
        onDrop={_onDrop}
        onClick={_openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={fileInputRef}
          className={styles.fileInput}
          type='file'
          multiple
          onChange={_onChange}
        />
        <div className={styles.dropIndicator}>
          <img
            alt='upload'
            className={styles.icon}
            src={imagesIcon}
          />
          <span>Upload Files</span>
        </div>
      </div>
    </div>
  );
};

Dropzone.defaultProps = {
  disabled: false,
  onFilesAdded: () => {},
  onError: () => {},
  fileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  images: [],
  maxLength: 10,
};

Dropzone.propTypes = {
  disabled: PropTypes.bool,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  onFilesAdded: PropTypes.func,
  onError: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
  })),
  maxLength: PropTypes.number,
};

export default Dropzone;
