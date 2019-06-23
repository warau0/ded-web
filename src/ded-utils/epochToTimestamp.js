import zeroPad from 'ded-utils/zeroPad';

export default (time) => {
  if (!time) return time;
  const d = new Date(time);
  return `${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}:${zeroPad(d.getSeconds())}`;
};
