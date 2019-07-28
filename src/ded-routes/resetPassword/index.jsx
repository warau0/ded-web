import React, {
  useState,
  useCallback,
  useContext,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import qs from 'query-string';

import Button from 'ded-components/button';
import ErrorMessage from 'ded-components/errorMessage';
import Layout from 'ded-components/layout';
import { ThemeContext, LoginContext } from 'ded-context';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

const ResetPassword = ({ location, history }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [theme] = useContext(ThemeContext);
  const [_, __, setIsLoggedIn] = useContext(LoginContext);

  const [
    resetPassword, resetPasswordLoading,
    resetPasswordError, clearResetPasswordError,
  ] = useApi(API.RESET_PASSWORD.SET);

  const _resetPassword = useCallback(() => {
    clearResetPasswordError();
    resetPassword(null, {
      user_id: query.user,
      token: query.token,
      password,
      password_confirmation: passwordConfirm,
    })
      .then((res) => {
        setIsLoggedIn(res.token);
        history.push('/');
      })
      .catch(() => {});
  }, [query.user, query.token, password, passwordConfirm]);

  return (
    <Layout className={cn(styles.resetPassword, styles[theme])}>
      <ErrorMessage className={styles.error} error={resetPasswordError} />
      <input
        type='password'
        name='password'
        className={styles.input}
        placeholder='New password'
        aria-label='New password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _resetPassword(); }}
      />
      <input
        type='password'
        name='password_confirm'
        className={styles.input}
        placeholder='Confirm password'
        aria-label='Confirm password'
        value={passwordConfirm}
        onChange={e => setPasswordConfirm(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') _resetPassword(); }}
      />
      <Button
        square
        brand='success'
        className={styles.confirmButton}
        onClick={_resetPassword}
        loading={resetPasswordLoading}
        text='Reset password'
      />
    </Layout>
  );
};

ResetPassword.defaultProps = {
  location: {
    search: '',
  },
};

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ResetPassword;
