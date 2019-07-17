import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import Gallery from 'ded-components/gallery';
import { EventContext, LoginContext } from 'ded-context';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [submissions, setSubmissions] = useState([]);

  const [__, user] = useContext(LoginContext);
  const [lastEvent] = useContext(EventContext);

  useEffect(() => {
    if (lastEvent
      && lastEvent.event === EVENT.UPDATE_GALLERY
      && user.sub === parseInt(match.params.id, 10)
    ) {
      getSubmissions(match.params.id).then(res => setSubmissions(res.submissions));
    }
  }, [lastEvent]);

  useEffect(() => {
    getSubmissions(match.params.id).then(res => setSubmissions(res.submissions));
  }, [match.params.id]);

  return (
    <Gallery
      big
      loading={submissionsLoading}
      submissions={submissions}
    />
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;
