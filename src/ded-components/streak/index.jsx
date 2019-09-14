import React, {
  memo,
  useEffect,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import { fire as fireIcon } from 'ded-assets';
import { API, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';
import { EventContext, ThemeContext } from 'ded-context';
import formatNumber from 'ded-utils/formatNumber';
import secondsToTimestamp from 'ded-utils/secondsToTimestamp';

import * as styles from './styles.pcss';

let midnightTimeout = null;

const calcTimeToMidnight = () => {
  const tomorrow = moment.utc().add(1, 'days').startOf('day');
  const today = moment.utc();
  const secondsLeft = tomorrow.diff(today, 'seconds');
  return secondsToTimestamp(secondsLeft);
};

const Streak = memo(() => {
  const [streak, setStreak] = useState(null);
  const [safeForDays, setSafeForDays] = useState(false);
  const [timeToMidnight, setTimeToMidnight] = useState(null);

  const [getStreak, streakLoading] = useApi(API.STREAKS.CURRENT);
  const [lastEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_STREAK) {
      getStreak().then(res => setStreak(res.streak || null));
    }
  }, [lastEvent]);

  useEffect(() => {
    getStreak().then(res => setStreak(res.streak || null));
  }, []);

  useEffect(() => {
    if (!streak) return;

    const lastDayToPost = moment(streak.updated_at).add(7, 'days').startOf('day');
    const today = moment().startOf('day');
    const daysToPost = lastDayToPost.diff(today, 'days');

    setSafeForDays(daysToPost);
  }, [streak]);

  const _startStreakTimer = () => {
    setTimeToMidnight(calcTimeToMidnight());
    midnightTimeout = setTimeout(_startStreakTimer, 1000);
  };

  const _stopStreakTimer = () => {
    clearTimeout(midnightTimeout);
  };

  const _streakTooltip = () => {
    switch (safeForDays) {
      case 7:
        return `Rest easy, your streak is safe for another ${safeForDays} days! If you post more today your streak won't change.`;
      case 6:
      case 5:
      case 4:
      case 3:
      case 2:
        return `Your streak is safe for another ${safeForDays} days, but if you post today your streak will still increase!`;
      case 1:
        return `Your streak is safe until midnight tomorrow, but if you post today your streak will still increase!`;
      case 0:
      default:
        return `Your streak is ending in ${timeToMidnight}!`;
    }
  }

  return (
    <div
      className={cn(styles.streakContainer, styles[theme], {
        [styles.inactive]: !streak && !streakLoading,
      })}
    >
      {streakLoading ? <Loader /> : (
        <div className={styles.streakInner} data-tip data-for='streak-tooltip'>
          <img
            draggable='false'
            className={styles.icon}
            src={fireIcon}
            alt='Streak'
          />
          <span className={styles.streak}>
            {streak ? formatNumber(streak.count) : 0}
          </span>

          {!!streak && (
            <div className={cn(styles.notification, {
              [styles.safe]: safeForDays === 7,
              [styles.warning]: safeForDays < 7 && safeForDays > 0,
            })}
            />
          )}
          {streak && (
            <ReactTooltip
              id='streak-tooltip'
              place='bottom'
              afterShow={_startStreakTimer}
              afterHide={_stopStreakTimer}
            >
              {_streakTooltip()}
            </ReactTooltip>
          )}
        </div>
      )}
    </div>
  );
});

export default Streak;
