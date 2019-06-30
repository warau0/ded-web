import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import cn from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';

import Modal from 'ded-components/modal';
import Button from 'ded-components/button';
import ErrorMessage from 'ded-components/errorMessage';
import { ThemeContext, LoginContext } from 'ded-context';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';
import config from '../../../config.json';

import * as styles from './styles.pcss';

const LoginModal = memo(() => {
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerRecaptcha, setRegisterRecaptcha] = useState(null);

  const [theme] = useContext(ThemeContext);
  const [_, __, setIsLoggedIn] = useContext(LoginContext);

  const [login, loginLoading, loginError, clearLoginError] = useApi(API.LOGIN);
  const [register, registerLoading, registerError, clearRegisterError] = useApi(API.REGISTER);

  const recaptchaRef = useRef(null);
  const loginUsernameRef = useRef(null);

  const _openModal = useCallback(() => {
    clearRegisterError();
    clearLoginError();
    setTabIndex(0);
    setShow(true);
  }, []);
  const _closeModal = useCallback(() => {
    setShow(false);
    clearRegisterError();
    clearLoginError();
  }, []);
  const _openLoginTab = useCallback(() => {
    clearRegisterError();
    setTabIndex(0);
  }, []);
  const _openRegisterTab = useCallback(() => {
    clearLoginError();
    setTabIndex(1);
  }, []);
  const _login = useCallback(() => login(null, {
    username: loginUsername,
    password: loginPassword,
  }).then(({ token }) => setIsLoggedIn(token)).catch(() => {}),
  [loginUsername, loginPassword]);
  const _register = useCallback(() => register(null, {
    username: registerUsername,
    email: registerEmail,
    password: registerPassword,
    password_confirmation: registerPasswordConfirm,
    recaptcha: registerRecaptcha,
  }).then(({ token }) => setIsLoggedIn(token)).catch(() => {
    recaptchaRef.current.reset();
  }),
  [
    registerUsername,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    registerRecaptcha,
  ]);

  useEffect(() => {
    if (show) {
      setTimeout(() => loginUsernameRef.current.focus(), 0);
    }
  }, [show]);

  const _renderLogin = () => (
    <>
      <ErrorMessage className={styles.error} error={loginError} />
      <input
        type='text'
        name='username'
        className={styles.input}
        placeholder='Username'
        aria-label='Username'
        value={loginUsername}
        onChange={e => setLoginUsername(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _login(); }}
        ref={loginUsernameRef}
      />
      <input
        type='password'
        name='password'
        className={styles.input}
        placeholder='Password'
        aria-label='Password'
        value={loginPassword}
        onChange={e => setLoginPassword(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _login(); }}
      />
      <Button
        square
        brand='success'
        className={styles.confirmButton}
        onClick={_login}
        loading={loginLoading}
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
      <ErrorMessage className={styles.error} error={registerError} />
      <input
        type='text'
        name='username'
        className={styles.input}
        placeholder='Username'
        aria-label='Username'
        value={registerUsername}
        onChange={e => setRegisterUsername(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _register(); }}
      />
      <input
        type='email'
        name='email'
        className={styles.input}
        placeholder='Email'
        aria-label='Email'
        value={registerEmail}
        onChange={e => setRegisterEmail(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _register(); }}
      />
      <input
        type='password'
        name='password'
        className={styles.input}
        placeholder='Password'
        aria-label='Password'
        value={registerPassword}
        onChange={e => setRegisterPassword(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _register(); }}
      />
      <input
        type='password'
        name='password_confirm'
        className={styles.input}
        placeholder='Confirm password'
        aria-label='Confirm password'
        value={registerPasswordConfirm}
        onChange={e => setRegisterPasswordConfirm(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _register(); }}
      />
      <div className={styles.captcha}>
        <ReCAPTCHA
          sitekey={config.RECAPTCHA_KEY}
          onChange={setRegisterRecaptcha}
          theme={theme}
          ref={recaptchaRef}
        />
      </div>
      <Button
        square
        brand='success'
        className={styles.confirmButton}
        onClick={_register}
        loading={registerLoading}
        text='Register'
      />
      <Button
        square
        brand='ghost'
        plainText
        plainFocus
        className={styles.alternateAction}
        onClick={_openLoginTab}
        text='Already have an account?'
      />
    </>
  );

  return (
    <>
      <Button onClick={_openModal} text='Login' />

      <Modal
        show={show}
        onClose={_closeModal}
        label='Login modal'
      >
        <div className={cn(styles.tabs, styles[theme])}>
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

        <div className={cn(styles.innerContent, styles[theme])}>
          {tabIndex === 0 ? _renderLogin() : _renderRegister()}
        </div>
      </Modal>
    </>
  );
});

export default LoginModal;
