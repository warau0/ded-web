import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import cn from 'classnames';
import Modal from 'react-modal';

import Button from 'components/button';
import { ThemeContext } from 'context';

import * as styles from './styles.pcss';

const LoginModal = memo(() => {
  const [show, setShow] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  const loginUsernameRef = useRef(null);

  const [theme] = useContext(ThemeContext);

  useState(() => {
    Modal.setAppElement('#root');
  });

  useEffect(() => {
    if (show) {
      setTimeout(() => loginUsernameRef.current.focus(), 0);
    }
  }, [show])

  const _openModal = useCallback(() => setShow(true), []);
  const _closeModal = useCallback(() => setShow(false), []);

  const _openLoginTab = useCallback(() => setTabIndex(0), []);
  const _openRegisterTab = useCallback(() => setTabIndex(1), []);

  const _renderLogin = () => (
    <>
      <input
        type='text'
        className={styles.input}
        placeholder='Email or Username'
        aria-label='Email or username'
        value={loginUsername}
        onChange={e => setLoginUsername(e.target.value)}
        ref={loginUsernameRef}
      />
      <input
        type='password'
        className={styles.input}
        placeholder='Password'
        aria-label='Password'
        value={loginPassword}
        onChange={e => setLoginPassword(e.target.value)}
      />
      <Button
        square
        brand='success'
        className={styles.confirmButton}
        text='Login'
      />
      <Button
        square
        brand='ghost'
        plainText
        plainFocus
        className={styles.alternateAction}
        onClick={_openRegisterTab}
        text={`Don't have an account?`}
      />
    </>
  );

  const _renderRegister = () => (
    <>
      <input
        type='text'
        className={styles.input}
        placeholder='Username'
        aria-label='Username'
        value={registerUsername}
        onChange={e => setRegisterUsername(e.target.value)}
      />
      <input
        type='email'
        className={styles.input}
        placeholder='Email'
        aria-label='Email'
        value={registerEmail}
        onChange={e => setRegisterEmail(e.target.value)}
      />
      <input
        type='password'
        className={styles.input}
        placeholder='Password'
        aria-label='Password'
        value={registerPassword}
        onChange={e => setRegisterPassword(e.target.value)}
      />
      <input
        type='password'
        className={styles.input}
        placeholder='Confirm password'
        aria-label='Confirm password'
        value={registerPasswordConfirm}
        onChange={e => setRegisterPasswordConfirm(e.target.value)}
      />
      <Button
        square
        brand='success'
        className={styles.confirmButton}
        text='Register'
      />
      <Button
        square
        brand='ghost'
        plainText
        plainFocus
        className={styles.alternateAction}
        onClick={_openLoginTab}
        text={`Already have an account?`}
      />
    </>
  );

  console.log('Render <LoginModal />');
  return (
    <>
      <Button
        className={styles.openButton}
        onClick={_openModal}
        text='Login'
      />

      <Modal
        isOpen={show}
        closeTimeoutMS={200}
        onRequestClose={_closeModal}
        contentLabel='Login modal'
        shouldCloseOnOverlayClick
        className={cn(styles.content, styles[theme])}
        overlayClassName={{
          base: styles.overlay,
          afterOpen: styles.overlayAfterOpen,
          beforeClose: styles.overlayBeforeClose,
        }}
      >
        <div className={styles.tabs}>
          <Button
            brand='ghost'
            square
            plainFocus
            className={cn(styles.tab, {
              [styles.inactive]: tabIndex !== 0,
            })}
            onClick={_openLoginTab}
            text='Login'
          />
          <Button
            brand='ghost'
            square
            plainFocus
            className={cn(styles.tab, {
              [styles.inactive]: tabIndex !== 1,
            })}
            onClick={_openRegisterTab}
            text='New account'
          />
        </div>

        <div className={styles.innerContent}>
          {tabIndex === 0 ? _renderLogin() : _renderRegister()}
        </div>
      </Modal>
    </>
  );
});

export default LoginModal;
