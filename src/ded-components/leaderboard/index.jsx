import React, {
  memo,
  useMemo,
  useEffect,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';

import { API, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';
import Button from 'ded-components/button';
import { EventContext, ThemeContext } from 'ded-context';
import formatNumber from 'ded-utils/formatNumber';

import * as styles from './styles.pcss';

const Leaderboard = memo(({ className }) => {
  const [leaderboards, setLeaderboards] = useState([]);
  const [offset, setOffset] = useState(0);

  const [getLeaderboard, leaderboardLoading] = useApi(API.LEADERBOARD.GET);

  const [lastEvent, _, consumeEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  const fetchLeaderboards = () => {
    getLeaderboard(offset).then((res) => {
      const newLeaderboards = [...leaderboards];
      const scores = res.leaderboard || [];
      newLeaderboards[offset] = {
        scores,
        personal: res.personal || null,
        scoresIncludePersonal: res.personal
          ? scores.findIndex(user => user.id === res.personal.id) !== -1
          : false,
      };
      setLeaderboards(newLeaderboards);
    });
  };

  useEffect(() => {
    if (lastEvent === EVENT.UPDATE_LEADERBOARD) {
      consumeEvent();
      fetchLeaderboards();
    }
  }, [lastEvent]);

  useEffect(() => {
    if (!leaderboards[offset]) {
      fetchLeaderboards();
    }
  }, [offset]);

  const month = useMemo(() => {
    const date = moment().subtract(offset, 'months');
    const includeDot = date.month() !== 4; // No dot for may since it's already 3 letters.
    return date.format(`MMM${includeDot ? '.' : ''} YYYY`);
  }, [offset]);

  const offsetHasData = leaderboards[offset] && leaderboards[offset].scores.length > 0;

  return (
    <div
      className={cn(styles.leaderboard, styles[theme], {
        [className]: className,
      })}
    >
      <div className={styles.titleContainer}>
        <Button
          onClick={() => setOffset(offset + 1)}
          noPadding
          round
          className={styles.navArrow}
          disabled={leaderboardLoading}
        >
          {'<'}
        </Button>

        <h1 className={styles.title}>{`${month} leaderboard`}</h1>

        <Button
          onClick={() => setOffset(offset - 1)}
          noPadding
          round
          className={styles.navArrow}
          disabled={offset <= 0 || leaderboardLoading}
        >
          {'>'}
        </Button>
      </div>

      {leaderboardLoading && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}

      {!leaderboardLoading && !offsetHasData && (
        <i className={styles.emptyLabel}>
          There are no submissions here :(
        </i>
      )}

      {!leaderboardLoading && offsetHasData && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards[offset].scores.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{formatNumber(user.total_hours)}</td>
              </tr>
            ))}
            {!leaderboards[offset].scoresIncludePersonal && leaderboards[offset].personal && (
              <tr>
                <td>You</td>
                <td>{leaderboards[offset].personal.username}</td>
                <td>{formatNumber(leaderboards[offset].personal.total_hours)}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
});

Leaderboard.defaultProps = {
  className: null,
};

Leaderboard.propTypes = {
  className: PropTypes.string,
};

export default Leaderboard;
