import { useEffect } from 'react';

export default (ref, except, onClick) => {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      if (except.current && except.current === event.target) return;
      onClick();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
