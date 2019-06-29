import secondsToTimestamp from 'ded-utils/secondsToTimestamp';

export default (first, second) => secondsToTimestamp(Math.floor((second - first) / 1000));
