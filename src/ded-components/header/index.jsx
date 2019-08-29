import React, { memo, useContext, lazy } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import UserMenu from 'ded-components/userMenu';
import Streak from 'ded-components/streak';
import Layout from 'ded-components/layout';
import ThemeButton from 'ded-components/themeButton';
import { ThemeContext, LoginContext } from 'ded-context';
import { logo } from 'ded-assets';

import * as styles from './styles.pcss';

const LoginModal = lazy(() => import('ded-components/loginModal'));
const UploadModal = lazy(() => import('ded-components/uploadModal'));

export default memo(() => {
  const [theme] = useContext(ThemeContext);
  const [isLoggedIn] = useContext(LoginContext);

  return (
    <div className={cn(styles.headerContainer, styles[theme])}>
      <Layout className={styles.header}>
        <div className={styles.left}>
          <Link to='/' className={styles.logo} tabIndex={-1}>
            <img src={logo} alt='Logo' />
            <span className={styles.title}>Draw Every Day!</span>
          </Link>
        </div>

        <div className={styles.right}>
          <div className={styles.menuItem}>
            {isLoggedIn
              ? <UploadModal />
              : <LoginModal />
            }
          </div>
          {!isLoggedIn && <div className={cn(styles.menuItem, styles.smMargin)}>
            <ThemeButton showLabel={false} smallerPadding />
          </div>}

          {isLoggedIn && <div className={styles.menuItem}><Streak /></div>}
          {isLoggedIn && <div className={styles.menuItem}><UserMenu /></div>}
        </div>
      </Layout>
    </div>
  );
});
