import React, { memo, useState, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ThemeContext } from 'ded-context';
import Button from 'ded-components/button';

import * as styles from './styles.pcss';

const ModalComponent = memo(({
  children,
  show,
  shouldCloseOnOverlayClick,
  label,
  onClose,
  ...restProps
}) => {
  const [theme] = useContext(ThemeContext);

  useState(() => {
    Modal.setAppElement('#root');
  });

  return (
    <Modal
      isOpen={show}
      className={cn(styles.modal, styles[theme])}
      overlayClassName={{
        base: styles.overlay,
        afterOpen: styles.overlayAfterOpen,
        beforeClose: styles.overlayBeforeClose,
      }}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      contentLabel={label}
      onRequestClose={onClose}
      {...restProps}
    >
      <Button
        className={styles.close}
        onClick={onClose}
        brand='mono'
        text='X'
        noPadding
        aria-label='close'
      />
      {children}
    </Modal>
  );
});

ModalComponent.defaultProps = {
  children: null,
  show: false,
  shouldCloseOnOverlayClick: true,
  label: '',
  onClose: null,
};

ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  show: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
  label: PropTypes.string,
  onClose: PropTypes.func,
};

export default ModalComponent;
