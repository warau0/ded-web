import React, {
  memo,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import ThemeButton from 'ded-components/themeButton';
import Button from 'ded-components/button';
import { LoginContext, ThemeContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

let hideTimeout = null;

export default memo(() => {
  const [show, setShow] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [getNotifications, notificationsLoading] = useApi(API.NOTIFICATIONS.GET);

  const [_, user, setIsLoggedIn] = useContext(LoginContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    getNotifications().then(res => setNotifications(res.notifications));
  }, []);

  const _showMenu = () => {
    clearTimeout(hideTimeout);
    setShow(true);
  };

  const _hideMenu = () => {
    setShow(false);
  };

  const _delayHideMenu = () => {
    hideTimeout = setTimeout(() => _hideMenu(), 250);
  };

  const _logout = () => {
    setIsLoggedIn(false);
  };

  const _renderNotifications = () => {
    if (notificationsLoading) {
      return <li><p>Loading!</p></li>;
    }
    if (!notifications || !notifications.length) {
      return <li><p>You don&apos;t have any notifications.</p></li>;
    }

    return notifications.map(msg => (
      <li key={msg.id}><p>{msg.text}</p></li>
    ));
  };

  return (
    <div
      className={cn(styles.menuAnchor, styles[theme])}
      onMouseEnter={_showMenu}
      onMouseLeave={_delayHideMenu}
    >
      <Button
        brand='ghost'
        className={styles.menuButton}
        onClick={show ? _hideMenu : _showMenu}
        onFocus={_showMenu}
        onBlur={_hideMenu}
        onKeyUp={(e) => { if (e.key === 'Escape') _hideMenu(); }}
      >
        <img src={defaultAvatar} alt='Menu' className={styles.avatar} />
      </Button>

      {show && (
        <div className={styles.menu}>
          <div className={styles.triangleContainer}>
            <div className={styles.triangle} />
          </div>

          <div className={styles.menuContent}>
            <h2 className={styles.menuHeader}>Notifications</h2>
            <ul className={styles.menuList}>
              {_renderNotifications()}
            </ul>

            <h2 className={styles.menuHeader}>Settings</h2>
            <ul className={styles.menuList}>
              <li>
                <ThemeButton />
              </li>
            </ul>

            <h2 className={styles.menuHeader}>Account</h2>
            <ul className={styles.menuList}>
              <li>
                <Link to={`/user/${user ? user.sub : null}`}>Your profile</Link>
              </li>
              <li>
                <Button
                  onClick={_logout}
                  plainFocus
                  plainText
                  brand='ghost'
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});
