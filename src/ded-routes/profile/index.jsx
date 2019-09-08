import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import { EventContext, LoginContext, ThemeContext } from 'ded-context';
import Gallery from 'ded-components/gallery';
import ProfileHeader from 'ded-components/profileHeader';
import Button from 'ded-components/button';
import { cross as crossIcon } from 'ded-assets';

import * as styles from './styles.pcss';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [getUser, userLoading] = useApi(API.USERS.SHOW);
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);
  const [paginator, setPaginator] = useState(null);

  const [__, loggedInUser] = useContext(LoginContext);
  const [lastEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (lastEvent
      && lastEvent.event === EVENT.UPDATE_GALLERY
      && loggedInUser.sub === parseInt(match.params.id, 10)
    ) {
      getSubmissions({ id: match.params.id }).then((res) => {
        setPaginator(res.submissions);
        setSubmissions(res.submissions.data);
      });
    }
  }, [lastEvent]);

  useEffect(() => {
    getSubmissions({ id: match.params.id }).then((res) => {
      setPaginator(res.submissions);
      setSubmissions(res.submissions.data);
    });
    getUser(match.params.id).then(res => setUser(res.user));
  }, [match.params.id]);

  const _loadMore = () => {
    getSubmissions({ id: match.params.id, page: paginator.current_page + 1 }).then((res) => {
      setPaginator(res.submissions);
      setSubmissions(submissions.concat(res.submissions.data));
    });
  };

  if (!user && !userLoading && !submissions) {
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
      {user && <ProfileHeader user={user} />}

      <Gallery
        big
        loading={submissionsLoading}
        submissions={submissions}
        padEmptyLabel
      />

      {paginator && paginator.next_page_url && !submissionsLoading && (
        <div className={styles.moreButtonContainer}>
          <Button
            aria-label='Load more'
            round
            brand='base'
            className={styles.moreButton}
            noPadding
            onClick={_loadMore}
          >
            <KeyboardArrowDown />
          </Button>
        </div>
      )}

      {submissions.length > 0 && paginator && !paginator.next_page_url && (
        <i className={styles.theEndLabel}>This is the end.</i>
      )}
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
