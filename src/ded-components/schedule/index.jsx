import React, { memo, useState, useContext } from 'react';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';
import Button from 'ded-components/button';
import arrow from 'ded-assets/arrow.png';

import * as styles from './styles.pcss';

const hours = [...Array(24).keys()].slice(1);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const today = days[new Date().getDay() - 1];

export default memo(() => {
  const [theme] = useContext(ThemeContext);

  const [expand, setExpand] = useState(false);

  const _toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={cn(styles.scheduleContainer, styles[theme])}>
      <div className={cn(styles.schedule, (expand ? styles.tall : styles.short))}>
        {expand ? (
          <div className={styles.weekView}>
            {days.map(day => (
              <div className={styles.day} key={day}>
                <div className={styles.dayHeader}>{day}</div>
                {hours.map(hour => (
                  <div className={styles.hour} key={hour}>
                    <span>{`${`0${hour}`.slice(-2)}:00`}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.dayView}>
            <div className={styles.dayHeader}>{today}</div>
            <div className={styles.days}>
              {hours.map(hour => <div className={styles.hour} key={hour}>{`${`0${hour}`.slice(-2)}:00`}</div>)}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={_toggleExpand}
        brand='mono'
        ghostFocus
        aria-label={expand ? 'Hide full schedule' : 'Show full schedule'}
        className={styles.expandButton}
        round
        noPadding
      >
        <img src={arrow} className={cn({ [styles.flip]: expand })} alt='^' />
      </Button>
    </div>
  );
});
