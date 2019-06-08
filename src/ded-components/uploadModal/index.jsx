import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import cn from 'classnames';

import Modal from 'ded-components/modal';
import Button from 'ded-components/button';
import ErrorMessage from 'ded-components/errorMessage';
import Dropzone from 'ded-components/dropzone';
import UploadPreview from 'ded-components/uploadPreview';
import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const LoginModal = memo(() => {
  const [show, setShow] = useState(true);
  const [images, setImages] = useState([]);

  const [theme] = useContext(ThemeContext);

  const _openModal = useCallback(() => {
    setShow(true);
  }, []);
  const _closeModal = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      setImages([]);
    }, 500); // Clear data after modal has faded out.
  }, []);

  const _onFilesAdded = (files) => {
    const newImages = images.concat(files);
    setImages(newImages);
  };

  return (
    <>
      <Button onClick={_openModal} text='Upload' />

      <Modal
        show={show}
        onClose={_closeModal}
        label='Upload modal'
      >
        <div className={cn(styles.innerContent, styles[theme])}>
          <Dropzone
            onFilesAdded={_onFilesAdded}
            onError={console.warn}
            images={images}
          />
          <UploadPreview images={images} />

          <div className={styles.inputContainer}>
            <textarea
              placeholder='Anything you want to say?'
            />

            <div className={styles.submitContainer}>
              <Button text='Cancel' brand='mono' square />
              <Button text='Submit' brand='success' square />
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
});

export default LoginModal;
