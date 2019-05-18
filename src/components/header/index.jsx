import React, { memo, useContext, lazy } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Button from 'components/button';
import ThemeButton from 'components/themeButton';
import { ThemeContext, LoginContext } from 'context';
import logo from 'assets/logo.png';

const LoginModal = lazy(() => import('components/loginModal'));

import * as styles from './styles.pcss';

export default memo(() => {
  const [theme] = useContext(ThemeContext);
  const [isLoggedIn] = useContext(LoginContext);

  return (
    <div className={cn(styles.header, styles[theme])}>
      <div className={styles.left}>
        <Link to='' className={styles.logo} tabIndex={-1}>
          <img src={logo} alt='Logo' />
          <span>{'Draw Every Day!'}</span>
        </Link>
      </div>

      <div className={styles.right}>
        {isLoggedIn
          ? <Button
              className={styles.uploadButton}
              text='Upload'
            />
          : <LoginModal />
        }
        <ThemeButton />
      </div>
    </div>
  );
});
