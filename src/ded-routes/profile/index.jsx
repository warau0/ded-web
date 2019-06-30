import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import Gallery from 'ded-components/gallery';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions(match.params.id).then(res => setSubmissions(res.submissions));
  }, []);

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
