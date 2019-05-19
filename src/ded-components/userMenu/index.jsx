import React, { memo, useState } from 'react';

import Button from 'ded-components/button';
import defaultAvatar from 'ded-assets/default-avatar.png';

import * as styles from './styles.pcss';

let hideTimeout = null;

export default memo(() => {
  const [show, setShow] = useState(false);

  const showMenu = () => {
    clearTimeout(hideTimeout);
    setShow(true);
  };

  const hideMenu = () => {
    setShow(false);
  };

  const delayHideMenu = () => {
    hideTimeout = setTimeout(() => setShow(false), 250);
  };

  return (
    <div
      className={styles.menuAnchor}
      onMouseEnter={showMenu}
      onMouseLeave={delayHideMenu}
    >
      <Button
        brand='ghost'
        className={styles.menuButton}
        onClick={show ? hideMenu : showMenu}
        onFocus={showMenu}
        onBlur={hideMenu}
        onKeyUp={(e) => { if (e.key === 'Escape') hideMenu(); }}
      >
        <img src={defaultAvatar} alt='Menu' className={styles.avatar} />
      </Button>

      {show && (
        <div className={styles.menu} tabIndex={-1}>
          <div className={styles.triangleContainer}>
            <div className={styles.triangle} />
          </div>

          <div className={styles.menuContent}>
            Menu content
          </div>
        </div>
      )}
    </div>
  );
});
