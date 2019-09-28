import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CreatableSelect from 'react-select/creatable';

import { API, EVENT } from 'ded-constants';
import { ThemeContext, EventContext } from 'ded-context';
import { useApi } from 'ded-hooks';
import Modal from 'ded-components/modal';
import ErrorMessage from 'ded-components/errorMessage';
import Button from 'ded-components/button';

import * as styles from './styles.pcss';

// TODO Merge with UploadModal component.
const EditSubmissionModal = ({ show, submission, onClose }) => {
  const [getTags] = useApi(API.TAGS.GET);
  const [
    editSubmission, editSubmissionLoading,
    editSubmissionError, clearEditSubmissionError,
  ] = useApi(API.SUBMISSIONS.PUT);

  const [theme] = useContext(ThemeContext);
  const [_, fireEvent] = useContext(EventContext);

  const [nsfw, setNsfw] = useState(submission.nsfw);
  const [priv, setPriv] = useState(submission.private);
  const [description, setDescription] = useState(submission.description);
  const [hours, setHours] = useState(submission.hours);
  const [tags, setTags] = useState(submission.tags.map(t => ({
    id: t.id, value: t.text, label: t.text,
  })));

  const [tagInput, setTagInput] = useState('');
  const [fetchedTags, setFetchedTags] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => { // Fetch all users tags
    if (show && !fetchedTags) {
      getTags().then(res => setTagOptions(res.tags.map(tag => ({
        id: tag.id,
        value: tag.text,
        label: tag.text,
      }))));
      setFetchedTags(true);
    }
  }, [show]);

  useEffect(() => {
    // Reset form when opening modal in case changes were made without saving.
    if (show) {
      setNsfw(submission.nsfw);
      setPriv(submission.private);
      setDescription(submission.description);
      setHours(submission.hours);
      setTags(submission.tags.map(t => ({
        id: t.id, value: t.text, label: t.text,
      })));
    }
  }, [show]);

  const _submit = () => {
    clearEditSubmissionError();
    editSubmission(submission.id, {
      description,
      hours,
      nsfw: nsfw ? 1 : 0,
      private: priv ? 1 : 0,
      tags: JSON.stringify(tags || []),
    }).then(() => {
      fireEvent(EVENT.UPDATE_SUBMISSION);
      onClose();
    });
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      label='Edit submission modal'
    >
      <div className={cn(styles.innerContent, styles[theme])}>

        <ErrorMessage error={editSubmissionError} />

        <div className={styles.inputContainer}>
          <div className={styles.inputRow}>
            <div className={styles.checkboxes}>
              <div className={styles.checkbox}>
                <label htmlFor='nsfw-edit-submission'>
                  <input
                    type='checkbox'
                    id='nsfw-edit-submission'
                    checked={nsfw}
                    onChange={() => setNsfw(!nsfw)}
                  />
                  NSFW
                </label>
              </div>
              <div className={styles.checkbox}>
                <label htmlFor='private-edit-submission'>
                  <input
                    type='checkbox'
                    id='private-edit-submission'
                    checked={priv}
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
              onClick={onClose}
              disabled={editSubmissionLoading}
            />
            <Button
              text='Save'
              brand='success'
              square
              onClick={_submit}
              loading={editSubmissionLoading}
            />
          </div>
        </div>

      </div>
    </Modal>
  );
};

EditSubmissionModal.defaultProps = {
  show: false,
  submission: null,
};

EditSubmissionModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  submission: PropTypes.shape({
    id: PropTypes.number,
    hours: PropTypes.number,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
    private: PropTypes.oneOf([0, 1]),
    nsfw: PropTypes.oneOf([0, 1]),
  }),
};

export default EditSubmissionModal;
