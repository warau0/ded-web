import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import { EventContext, LoginContext, ThemeContext } from 'ded-context';
import Gallery from 'ded-components/gallery';
import Layout from 'ded-components/layout';
import ProfileHeader from 'ded-components/profileHeader';
import { cross as crossIcon } from 'ded-assets';

import * as styles from './styles.pcss';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [getUser, userLoading] = useApi(API.USERS.SHOW);
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);

  const [__, loggedInUser] = useContext(LoginContext);
  const [lastEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

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

  if (!user && !userLoading) {
    return (
      <div className={cn(styles.errorContainer, styles[theme])}>
        <div>
          <img src={crossIcon} draggable='false' alt='Error' />
        </div>
        <div>{'This user doesn\'t exist.'}</div>
      </div>
    );
  }

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
