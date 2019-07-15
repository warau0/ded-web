import zeroPad from 'ded-utils/zeroPad';

export default (totalSecondsIn) => {
  if (totalSecondsIn <= 0) {
    return '00:00:00';
  }

  const hours = Math.floor(totalSecondsIn / 3600);
  const totalSeconds = totalSecondsIn % 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (hours > 999) {
    return '999:99:99';
  }

  return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
};
