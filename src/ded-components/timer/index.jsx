import React, {
  useContext,
  memo,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
import Alarm from '@material-ui/icons/Alarm';
import Close from '@material-ui/icons/Close';

import { ThemeContext, EventContext, LoginContext } from 'ded-context';
import Button from 'ded-components/button';
import { STORAGE, EVENT } from 'ded-constants';
import secondsToTimestamp from 'ded-utils/secondsToTimestamp';
import epochToTimestamp from 'ded-utils/epochToTimestamp';
import diffTimes from 'ded-utils/diffTimes';

import * as styles from './styles.pcss';

let timerInterval = null;
let logLabels = [];

export default memo(() => {
  const [theme] = useContext(ThemeContext);
  const [lastEvent] = useContext(EventContext);
  const [isLoggedIn] = useContext(LoginContext);

  const [logs, setLogs] = useState([]);
  const [showTimer, setShowTimer] = useState(
    JSON.parse(window.localStorage.getItem(STORAGE.TIMER_SHOW) || false),
  );
  const [hideButton, setHideButton] = useState(
    JSON.parse(window.localStorage.getItem(STORAGE.SETTINGS_HIDE_TIMER) || false),
  );
  const [active, setActive] = useState(false);
  const [loggedTime, setLoggedTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);

  const startTimer = (initialTotal = 0, initialActive = 0) => {
    setActiveTime(initialActive);
    let internalTime = initialActive;
    let totalTime = initialTotal;
    timerInterval = setInterval(() => {
      setActiveTime(internalTime += 1);
      setLoggedTime(totalTime += 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.SETTINGS_CHANGED_HIDE_TIMER) {
      setHideButton(
        JSON.parse(window.localStorage.getItem(STORAGE.SETTINGS_HIDE_TIMER) || false),
      );
    }
  }, [lastEvent]);

  // Load existing logs from localStorage.
  useEffect(() => {
    let existingLogs = window.localStorage.getItem(STORAGE.TIMER_LOGS);
    let totalLoggedTime = 0;
    let activeLoggedTime = 0;

    if (existingLogs) {
      try {
        existingLogs = JSON.parse(existingLogs);
        existingLogs.map((log) => {
          const newLog = log;

          if (log.end) {
            totalLoggedTime += Math.floor((log.end - log.start) / 1000);
          } else {
            activeLoggedTime = Math.floor((new Date() - log.start) / 1000);
            totalLoggedTime += activeLoggedTime;
          }
          newLog.startTimestamp = epochToTimestamp(log.start);
          newLog.endTimestamp = log.end ? epochToTimestamp(log.end) : null;

          logLabels.push(newLog.label);

          return newLog;
        });
        if (!existingLogs[0].end) {
          setActive(true);
          startTimer(totalLoggedTime, activeLoggedTime);
        }
      } catch (e) { // Bad json in localStorage
        existingLogs = [];
        window.localStorage.removeItem(STORAGE.TIMER_LOGS);
      }

      setLoggedTime(totalLoggedTime);
      setLogs(existingLogs);
    }
  }, []);

  useEffect(() => () => {
    clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    logs.forEach((_, i) => {
      const inputEl = document.getElementById(`log-label-${i}`);
      inputEl.value = logLabels[i];
    });
  }, [logs]);

  const saveLogs = (newLogs) => {
    setLogs(newLogs);
    window.localStorage.setItem(STORAGE.TIMER_LOGS, JSON.stringify(newLogs));
  };

  const saveShowTimer = (show) => {
    setShowTimer(show);
    window.localStorage.setItem(STORAGE.TIMER_SHOW, JSON.stringify(show));
  };

  const start = () => {
    const newLogs = logs;
    const startTime = +new Date();
    newLogs.unshift({
      start: startTime,
      end: null,
      startTimestamp: epochToTimestamp(startTime),
      label: '',
    });

    saveLogs(newLogs);
    setActive(true);
    startTimer(loggedTime);
  };

  const stop = () => {
    const newLogs = logs;
    const lastItem = newLogs.shift();
    const end = +new Date();
    lastItem.end = end;
    lastItem.endTimestamp = epochToTimestamp(end);
    newLogs.unshift(lastItem);

    saveLogs(newLogs);
    setActive(false);
    stopTimer();
  };

  const reset = () => {
    setLoggedTime(0);
    setActiveTime(0);
    saveLogs([]);
    logLabels = [];
  };

  const onLabelChange = (index, text) => {
    const log = logs[index];
    log.label = text;

    const newLogs = logs;
    newLogs[index] = log;
    saveLogs(newLogs);
  };

  if (hideButton || !isLoggedIn) {
    return null;
  }

  return (
    <>
      <Button
        noPadding
        aria-label='Open timer'
        type='button'
        onClick={() => saveShowTimer(true)}
        className={cn(styles.timerButton, styles[theme], {
          [styles.active]: active,
          [styles.hide]: showTimer,
        })}
      >
        {active && (
          <span className={styles.floatingTime}>{secondsToTimestamp(activeTime)}</span>
        )}
        <Alarm />
      </Button>

      <div className={cn(styles.container, {
        [styles.show]: showTimer,
      })}
      >
        <div className={cn(styles.timer, styles[theme])}>
          <Button
            className={styles.close}
            onClick={() => saveShowTimer(false)}
            brand='mono'
            noPadding
            aria-label='close'
          >
            <Close />
          </Button>

          <div className={styles.timeContainer}>
            <div className={styles.currentTime}>{secondsToTimestamp(activeTime)}</div>
            <div className={styles.totalTime}>{secondsToTimestamp(loggedTime)}</div>
          </div>

          <div className={styles.log}>
            {logs.map((log, i) => (
              <div
                className={styles.line}
                key={log.start}
              >
                <div
                  {...log.end && { 'data-tip': diffTimes(log.start, log.end) }}
                  className={styles.timestamp}
                >
                  {`${log.startTimestamp} - ${log.endTimestamp || 'now'}`}
                </div>
                <input
                  placeholder='...'
                  id={`log-label-${i}`}
                  onChange={e => onLabelChange(i, e.target.value)}
                  maxLength={50}
                />
                {log.end && <ReactTooltip />}
              </div>
            ))}

            {logs.length === 0 && (
              <div className={styles.info}>
                <p>The timer will keep going even if you close your browser.</p>
                <p>If you clear browser data (cookies etc.) your timer will also be cleared.</p>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            {(!active && logs.length > 0) && <Button brand='danger' className={styles.resetButton} text='Reset' onClick={reset} />}
            {active
              ? <Button text='Stop' onClick={stop} />
              : <Button brand='success' text='Start' onClick={start} />
            }
          </div>
        </div>
      </div>
    </>
  );
});
