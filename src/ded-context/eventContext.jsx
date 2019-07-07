import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const EventContext = createContext([null, () => {}, () => {}]);

const EventProvider = ({ children }) => {
  const [lastEvent, setEvent] = useState(null);

  return (
    <EventContext.Provider value={[lastEvent, event => setEvent(event), () => setEvent(null)]}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EventContext, EventProvider };
