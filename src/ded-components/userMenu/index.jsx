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
import { LoginContext, ThemeContext, EventContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API, STORAGE, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

let hideTimeout = null;

export default memo(() => {
  const [show, setShow] = useState(false);
  const [hasUnseen, setHasUnseen] = useState(false);
  const [avatar, setAvatar] = useState(window.localStorage.getItem(STORAGE.AVATAR) || null);
  const [notifications, setNotifications] = useState([]);

  const [getNotifications, notificationsLoading] = useApi(API.NOTIFICATIONS.GET);
  const [postSeenNotifications] = useApi(API.NOTIFICATIONS.SEEN);
  const [getAvatar] = useApi(API.AVATAR.GET);

  const [_, user, setIsLoggedIn] = useContext(LoginContext);
  const [theme] = useContext(ThemeContext);
  const [lastEvent] = useContext(EventContext);

  useEffect(() => {
    getNotifications().then((res) => {
      setNotifications(res.notifications);
      setHasUnseen(res.notifications.findIndex(n => !n.seen) !== -1);
    });
  }, []);

  useEffect(() => {
    if (user && !avatar && avatar !== 'null') {
      getAvatar().then((res) => {
        window.localStorage.setItem(STORAGE.AVATAR, res && res.avatar
          ? res.avatar.url.replace('{userID}', user.sub)
          : 'null');
        setAvatar(res.avatar.url);
      });
    }
  }, []);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_AVATAR) {
      setAvatar(window.localStorage.getItem(STORAGE.AVATAR) || null);
    }
  }, [lastEvent]);

  const _showMenu = () => {
    clearTimeout(hideTimeout);
    setShow(true);
    if (hasUnseen) {
      setTimeout(() => {
        postSeenNotifications().then(() => {
          setHasUnseen(false);
        });
      }, 1000);
    }
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
      <li className={styles.notification} key={msg.id}>
        <Link to={`/submission/${msg.notification_parent_id}`}>
          {hasUnseen && !msg.seen && <span className={styles.dot} />}
          {msg.text}
        </Link>
      </li>
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
        plainText
      >
        {hasUnseen && <span className={styles.dot} />}
        <img
          src={avatar && avatar !== 'null' ? avatar : defaultAvatar}
          alt='Menu'
          className={styles.avatar}
        />
      </Button>

      {show && (
        <div className={styles.menu}>
          <div className={styles.triangleContainer}>
            <div className={styles.triangle} />
          </div>

          <div className={styles.menuContent}>
            <h3 className={styles.menuHeader}>Notifications</h3>
            <ul className={cn(styles.menuList, styles.notifications)}>
              {_renderNotifications()}
            </ul>

            <h3 className={styles.menuHeader}>Settings</h3>
            <ul className={styles.menuList}>
              <li>
                <ThemeButton />
              </li>
            </ul>

            <h3 className={styles.menuHeader}>Account</h3>
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
