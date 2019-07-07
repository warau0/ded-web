import React, {
  memo,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import cn from 'classnames';
import CreatableSelect from 'react-select/creatable';

import Modal from 'ded-components/modal';
import Button from 'ded-components/button';
import Dropzone from 'ded-components/dropzone';
import UploadPreview from 'ded-components/uploadPreview';
import ErrorMessage from 'ded-components/errorMessage';
import { ThemeContext } from 'ded-context';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

const UploadModal = memo(() => {
  const [getTags] = useApi(API.TAGS.GET);
  const [
    postSubmission, postSubmissionLoading,
    postSubmissionError, clearPostSubmissionError,
  ] = useApi(API.SUBMISSIONS.POST);

  const [show, setShow] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [fetchedTags, setFetchedTags] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);

  // Form data
  const [images, setImages] = useState([]);
  const [nsfw, setNsfw] = useState(false);
  const [priv, setPriv] = useState(false);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [tags, setTags] = useState([]);

  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (show && !fetchedTags) {
      getTags().then(res => setTagOptions(res.tags.map(tag => ({
        id: tag.id,
        value: tag.text,
        label: tag.text,
      }))));
      setFetchedTags(true);
    }
  }, [show]);

  const _openModal = useCallback(() => {
    setShow(true);
  }, []);
  const _closeModal = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      setImages([]);
      setNsfw(false);
      setPriv(false);
      setDescription('');
      setHours('');
      setTags([]);
      clearPostSubmissionError();
    }, 200); // Clear data after modal has faded out.
  }, []);

  const _onFilesAdded = (files) => {
    const newImages = images.concat(files);
    setImages(newImages);
  };

  const _removeImage = (image) => {
    const newImages = images.filter(img => img.id !== image);
    setImages(newImages);
  };

  const _submit = () => {
    const uploadForm = new FormData();
    clearPostSubmissionError();

    uploadForm.append('description', description || '');
    uploadForm.append('hours', hours || 0);
    uploadForm.append('nsfw', nsfw ? 1 : 0);
    uploadForm.append('private', priv ? 1 : 0);
    uploadForm.append('tags', JSON.stringify(tags));
    images.forEach(file => uploadForm.append('images[]', file));

    postSubmission(null, uploadForm, false).then(() => {
      _closeModal();
    }).catch(() => {});
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
            maxLength={10}
          />
          <UploadPreview
            images={images}
            onDelete={_removeImage}
          />

          {images.length === 10 && (
            <div className={styles.maxLengthLabel}>
              Max images: 10
            </div>
          )}

          <ErrorMessage
            className={styles.error}
            error={postSubmissionError}
          />

          <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
              <div className={styles.checkboxes}>
                <div className={styles.checkbox}>
                  <label htmlFor='nsfw'>
                    <input
                      type='checkbox'
                      id='nsfw'
                      value={nsfw}
                      onChange={() => setNsfw(!nsfw)}
                    />
                    Nsfw
                  </label>
                </div>
                <div className={styles.checkbox}>
                  <label htmlFor='private'>
                    <input
                      type='checkbox'
                      id='private'
                      value={priv}
                      onChange={() => setPriv(!priv)}
                    />
                    Private
                  </label>
                </div>
              </div>
              <div className={styles.textareaContainer}>
                <textarea
                  placeholder='Anything you want to say?'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <label htmlFor='hours' className={cn(styles.label, styles.hours)}>
                <span className={styles.labelText}>Hours</span>
                <input
                  id='hours'
                  name='hours'
                  value={hours}
                  placeholder={0}
                  type='number'
                  min={0}
                  max={999}
                  onChange={(e) => { if (e.target.value.length <= 3) setHours(e.target.value); }}
                />
              </label>

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.label} htmlFor='tags'>
                <span className={styles.labelText}>Tags</span>
                <CreatableSelect
                  options={tagOptions}
                  isMulti
                  aria-label='tags'
                  inputId='tags'
                  name='tags'
                  placeholder='Anatomy, master study, animation, etc ...'
                  className={styles.tags}
                  value={tags}
                  onChange={value => setTags(value)}
                  onInputChange={(e) => { if (e.length <= 50) setTagInput(e); }}
                  inputValue={tagInput}
                  classNamePrefix='tags'
                />
              </label>
            </div>


            <div className={styles.submitContainer}>
              <Button
                text='Cancel'
                brand='mono'
                square
                onClick={_closeModal}
                disabled={postSubmissionLoading}
              />
              <Button
                text='Submit'
                brand='success'
                square
                onClick={_submit}
                loading={postSubmissionLoading}
              />
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
});

export default UploadModal;
