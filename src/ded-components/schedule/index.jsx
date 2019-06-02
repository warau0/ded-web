import React, {
  memo,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import cn from 'classnames';

import ErrorMessage from 'ded-components/errorMessage';
import { ThemeContext } from 'ded-context';
import { arrow, plus } from 'ded-assets';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Button from 'ded-components/button';
import Modal from 'ded-components/modal';

import * as styles from './styles.pcss';

const hours = [...Array(24).keys()].slice(1);
const days = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 0, name: 'Sunday' },
];
const today = new Date().getDay();
const colors = [
  'Tomato', 'Flamingo', 'Tangerine', 'Banana',
  'Sage', 'Basil', 'Peacock', 'Blueberry',
  'Lavender', 'Grape', 'Graphite', 'Sky',
];

export default memo(() => {
  const [theme] = useContext(ThemeContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [expand, setExpand] = useState(false);
  const [plans, setPlans] = useState([]);
  const [getPlans] = useApi(API.PLANS.GET);
  const [putPlan, putLoading, putError, clearPutError] = useApi(API.PLANS.PUT);
  const [postPlan, postLoading, postError, clearPostError] = useApi(API.PLANS.POST);
  const [deletePlan, deleteLoading, deleteError, clearDeleteError] = useApi(API.PLANS.DELETE);

  useEffect(() => {
    getPlans().then(res => setPlans(res.plans));
  }, []);

  const clearErrors = () => {
    clearPutError();
    clearPostError();
    clearDeleteError();
  };

  const _closeEditModal = useCallback(() => {
    setShowEditModal(false);
    clearErrors();
  }, []);

  const _toggleExpand = () => {
    setExpand(!expand);
  };

  const _submitPlan = useCallback(() => {
    const insertPlan = (result) => {
      const newPlans = plans;
      if (!newPlans[result.day]) newPlans[result.day] = {};
      newPlans[result.day][result.start] = result;
      setPlans(newPlans);
      setEditPlan(null);
      _closeEditModal();
    };

    clearErrors();
    if (editPlan.id) {
      putPlan(editPlan.id, editPlan).then(insertPlan).catch(() => {});
    } else {
      postPlan(null, editPlan).then(insertPlan).catch(() => {});
    }
  }, [editPlan]);

  const _deletePlan = useCallback(() => {
    clearErrors();

    deletePlan(editPlan.id)
      .then(() => {
        const newPlans = plans;
        if (newPlans[editPlan.day] && newPlans[editPlan.day][editPlan.start]) {
          delete newPlans[editPlan.day][editPlan.start];
          setPlans(newPlans);
        }
        setEditPlan(null);
        _closeEditModal();
      })
      .catch(() => {});
  }, [editPlan]);

  const _renderTime = hour => `${`0${hour}`.slice(-2)}:00`;

  const _renderPlan = (dayIndex, hour) => {
    const plan = plans[dayIndex] && plans[dayIndex][hour]
      ? plans[dayIndex] && plans[dayIndex][hour]
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
            styles[plan.color],
            { [styles.sm]: duration === 1 },
          )}
          onClick={() => {
            setEditPlan({ ...plan, day: dayIndex });
            setShowEditModal(true);
          }}
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
        onClick={() => {
          setEditPlan({ // Default plan
            day: dayIndex,
            start: hour,
            duration: 1,
            color: 'sky',
          });
          setShowEditModal(true);
        }}
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
            {days.map(day => (
              <div className={styles.day} key={day.id}>
                <div className={styles.dayHeader}>{day.name}</div>
                {hours.map(hour => (
                  <div className={styles.hour} key={hour}>
                    <span>{_renderTime(hour)}</span>
                    {_renderPlan(day.id, hour - 1)}
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
            <div className={styles.dayHeader}>{days.find(day => day.id === today).name}</div>
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

      <Modal
        show={showEditModal}
        onClose={_closeEditModal}
        label='Plan modal'
      >
        {editPlan && (
          <div className={cn(styles.editModal, styles[theme])}>
            <h2>{editPlan.id ? 'Edit plan' : 'Create a plan'}</h2>

            <ErrorMessage
              className={styles.error}
              error={putError || postError || deleteError}
            />

            <textarea
              placeholder='What do you plan to do?'
              value={editPlan.text}
              onChange={e => setEditPlan({ ...editPlan, text: e.target.value })}
            />

            <div className={styles.inputContainer}>
              <label htmlFor='color'>
                Color
                <select
                  id='color'
                  name='color'
                  value={editPlan.color}
                  onChange={e => setEditPlan({ ...editPlan, color: e.target.value })}
                >
                  {colors.map(color => (
                    <option key={color} value={color.toLowerCase()}>{color}</option>
                  ))}
                </select>
              </label>

              <label className={styles.dayInput} htmlFor='day'>
                Day
                <select
                  id='day'
                  name='day'
                  value={editPlan.day}
                  onChange={e => setEditPlan({ ...editPlan, day: e.target.value })}
                >
                  {days.map(day => (
                    <option key={day.id} value={day.id}>{day.name}</option>
                  ))}
                </select>
              </label>

              <label className={styles.startInput} htmlFor='start'>
                Start
                <select
                  id='start'
                  name='start'
                  value={editPlan.start}
                  onChange={e => setEditPlan({ ...editPlan, start: e.target.value })}
                >
                  <option value={0}>{_renderTime(0)}</option>
                  {hours.map(hour => (
                    <option key={hour} value={parseInt(hour, 10)}>{_renderTime(hour)}</option>
                  ))}
                </select>
              </label>

              <label htmlFor='hours' className={styles.hourInput}>
                Hours
                <input
                  id='hours'
                  name='hours'
                  value={editPlan.duration}
                  onChange={e => setEditPlan({ ...editPlan, duration: e.target.value })}
                />
              </label>
            </div>

            <div className={styles.footer}>
              <div>
                {editPlan.id && (
                  <Button
                    text='Delete'
                    brand='danger'
                    square
                    onClick={_deletePlan}
                    loading={deleteLoading}
                  />
                )}
              </div>
              <div className={styles.submitContainer}>
                <Button text='Cancel' brand='mono' square onClick={_closeEditModal} />
                <Button text='Submit' brand='success' square onClick={_submitPlan} loading={putLoading || postLoading} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});
