import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';

import { fire as fireIcon } from 'ded-assets';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

const Streak = memo(() => {
  const [streak, setStreak] = useState(null);
  const [getStreak, streakLoading] = useApi(API.STREAKS.CURRENT);

  useEffect(() => {
    getStreak().then(res => setStreak(res.streak || null));
  }, []);

  return (
    <div className={cn(styles.streakContainer, { [styles.inactive]: !streak && !streakLoading })}>
      {streakLoading ? <Loader size='sm' /> : (
        <>
          <img
            draggable='false'
            className={styles.icon}
            src={fireIcon}
            alt='Streak'
          />
          <span className={styles.streak}>
            {streak ? streak.count : 0}
          </span>
        </>
      )}
    </div>
  );
});

Streak.defaultProps = {

};

Streak.propTypes = {

};

export default Streak;
