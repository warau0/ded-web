import React, {
  memo,
  useState,
  useContext,
  useEffect,
} from 'react';
import cn from 'classnames';

import { ThemeContext } from 'ded-context';
import Button from 'ded-components/button';
import arrow from 'ded-assets/arrow.png';
import plus from 'ded-assets/plus-circle.png';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';

import * as styles from './styles.pcss';

const hours = [...Array(24).keys()].slice(1);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const today = new Date().getDay() - 1;

export default memo(() => {
  const [theme] = useContext(ThemeContext);

  const [expand, setExpand] = useState(false);
  const [plans, setPlans] = useState([]);
  const [getPlans] = useApi(API.NOTIFICATIONS);

  useEffect(() => {
    getPlans().then(res => setPlans(res.plans));
  }, []);

  const _toggleExpand = () => {
    setExpand(!expand);
  };

  const _renderTime = hour => `${`0${hour}`.slice(-2)}:00`;

  const _renderPlan = (dayIndex, hour) => {
    const actualDay = [1, 2, 3, 4, 5, 6, 0][dayIndex];
    const plan = plans[actualDay] && plans[actualDay][hour]
      ? plans[actualDay] && plans[actualDay][hour]
      : null;

    if (plan) {
      const duration = (plan.duration + hour > 24) ? (24 - hour) : plan.duration;

      /* eslint-disable jsx-a11y/click-events-have-key-events */
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      return (
        <div
          className={cn(
            styles.plan,
            styles[`size-${duration}`],
            styles[plan.brand],
            { [styles.sm]: duration === 1 },
          )}
          onClick={() => console.log('plan', hour)}
        >
          <div className={styles.text}>
            {plan.text}
          </div>
          {duration > 1 && (
            <div className={styles.timestamp}>
              {`${_renderTime(hour)} - ${_renderTime(hour + duration)}`}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={styles.emptyPlan}
        onClick={() => console.log('empty', hour)}
      >
        <img src={plus} alt='+' />
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events */
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  };

  return (
    <div className={cn(styles.scheduleContainer, styles[theme])}>
      <div className={cn(styles.schedule, (expand ? styles.tall : styles.short))}>
        {expand ? (
          /**
           * Week view
           */
          <div className={styles.weekView}>
            {days.map((day, dayIndex) => (
              <div className={styles.day} key={day}>
                <div className={styles.dayHeader}>{day}</div>
                {hours.map(hour => (
                  <div className={styles.hour} key={hour}>
                    <span>{_renderTime(hour)}</span>
                    {_renderPlan(dayIndex, hour - 1)}
                  </div>
                ))}
                <div className={styles.hour} key={23}>
                  {_renderPlan(today, 23)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /**
           * Day view
           */
          <div className={styles.dayView}>
            <div className={styles.dayHeader}>{days[today]}</div>
            <div className={styles.days}>
              <div className={styles.hour} key={0}>
                <span>{_renderTime(0)}</span>
                {_renderPlan(today, 0)}
              </div>
              {hours.map(hour => (
                <div className={styles.hour} key={hour}>
                  <span>{_renderTime(hour)}</span>
                  {_renderPlan(today, hour)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={_toggleExpand}
        brand='mono'
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
