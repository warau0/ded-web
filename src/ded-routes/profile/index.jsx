import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import { EventContext, LoginContext } from 'ded-context';
import Gallery from 'ded-components/gallery';
import Layout from 'ded-components/layout';
import ProfileHeader from 'ded-components/profileHeader';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [getUser] = useApi(API.USERS.SHOW);
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);

  const [__, loggedInUser] = useContext(LoginContext);
  const [lastEvent] = useContext(EventContext);

  useEffect(() => {
    if (lastEvent
      && lastEvent.event === EVENT.UPDATE_GALLERY
      && loggedInUser.sub === parseInt(match.params.id, 10)
    ) {
      getSubmissions(match.params.id).then(res => setSubmissions(res.submissions));
    }
  }, [lastEvent]);

  useEffect(() => {
    getSubmissions(match.params.id).then(res => setSubmissions(res.submissions));
    getUser(match.params.id).then(res => setUser(res.user));
  }, [match.params.id]);

  return (
    <>
      <Layout>
        {user && <ProfileHeader user={user} />}
      </Layout>

      <Gallery
        big
        loading={submissionsLoading}
        submissions={submissions}
      />
    </>
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
