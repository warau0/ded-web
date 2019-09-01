import React, {
  memo,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import ThemeButton from 'ded-components/themeButton';
import Button from 'ded-components/button';
import { LoginContext, ThemeContext, EventContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API, STORAGE, EVENT } from 'ded-constants';
import { useApi, useClickOutside } from 'ded-hooks';

import * as styles from './styles.pcss';

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

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const _hideMenu = () => {
    setShow(false);
  };

  useClickOutside(menuRef, menuButtonRef, _hideMenu);

  useEffect(() => {
    getNotifications().then((res) => {
      setNotifications(res.notifications);
      setHasUnseen(res.notifications.findIndex(n => !n.seen) !== -1);
    });
  }, []);

  useEffect(() => {
    if (user && !avatar && avatar !== 'null') {
      getAvatar().then((res) => {
        const url = (res && res.avatar) ? res.avatar.url : 'null';

        window.localStorage.setItem(STORAGE.AVATAR, url);
        setAvatar(url);
      });
    }
  }, []);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_AVATAR) {
      setAvatar(window.localStorage.getItem(STORAGE.AVATAR) || null);
    }
  }, [lastEvent]);

  const _showMenu = () => {
    setShow(true);
    if (hasUnseen) {
      setTimeout(() => {
        postSeenNotifications().then(() => {
          setHasUnseen(false);
        });
      }, 1000);
    }
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

    return notifications.map(msg => {
      const content = (
        <>
          {hasUnseen && !msg.seen && <span className={styles.dot} />}
          {msg.text}
        </>
      );

      return (
        <li className={styles.notification} key={msg.id}>
          {msg.notification_parent_type ? (
            <Link
              className={styles.notificationLine}
              onClick={_hideMenu}
              to={`/submission/${msg.notification_parent_id}`}
            >
              {content}
            </Link>
          ) : (
            <div className={styles.notificationLine}>
              {content}
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <div className={cn(styles.menuAnchor, styles[theme])}>
      <Button
        brand='ghost'
        className={styles.menuButton}
        onClick={show ? _hideMenu : _showMenu}
        onKeyUp={(e) => { if (e.key === 'Escape') _hideMenu(); }}
        plainText
        ref={menuButtonRef}
      >
        {hasUnseen && <span className={styles.dot} />}
        <img
          src={avatar && avatar !== 'null' ? avatar : defaultAvatar}
          alt='Menu'
          className={styles.avatar}
        />
      </Button>

      {show && (
        <div className={styles.menu} ref={menuRef}>
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
                <Link onClick={_hideMenu} to={`/user/${user ? user.username : null}`}>Your profile</Link>
              </li>
              <li>
                <Link onClick={_hideMenu} to='/settings'>Settings</Link>
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
