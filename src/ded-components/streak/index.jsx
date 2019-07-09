import React, {
  memo,
  useEffect,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';

import { fire as fireIcon } from 'ded-assets';
import { API, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';
import { EventContext, ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

const Streak = memo(() => {
  const [streak, setStreak] = useState(null);
  const [getStreak, streakLoading] = useApi(API.STREAKS.CURRENT);
  const [lastEvent, _, consumeEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (lastEvent === EVENT.UPDATE_STREAK) {
      consumeEvent();
      getStreak().then(res => setStreak(res.streak || null));
    }
  }, [lastEvent]);

  useEffect(() => {
    getStreak().then(res => setStreak(res.streak || null));
  }, []);

  return (
    <div
      className={cn(styles.streakContainer, styles[theme], {
        [styles.inactive]: !streak && !streakLoading,
      })}
    >
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
