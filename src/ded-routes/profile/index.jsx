import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { useApi } from 'ded-hooks';
import { API, EVENT } from 'ded-constants';
import { EventContext, LoginContext, ThemeContext } from 'ded-context';
import { cross as crossIcon } from 'ded-assets';
import Gallery from 'ded-components/gallery';
import ProfileHeader from 'ded-components/profileHeader';
import Button from 'ded-components/button';
import Layout from 'ded-components/layout';
import SubmissionTags from 'ded-components/submissionTags';

import * as styles from './styles.pcss';

const Profile = ({ match }) => {
  const [getSubmissions, submissionsLoading] = useApi(API.USERS.SUBMISSIONS);
  const [getTaggedSubmissions, taggedSubmissionsLoading] = useApi(API.SUBMISSIONS.TAGGED_INDEX);
  const [getLikes, likesLoading] = useApi(API.USERS.LIKES);
  const [getUser, userLoading] = useApi(API.USERS.SHOW);
  const [followUser, followUserLoading] = useApi(API.USERS.FOLLOW);

  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [likes, setLikes] = useState([]);
  const [submissionsPaginator, setSubmissionsPaginator] = useState(null);
  const [likesPaginator, setLikesPaginator] = useState(null);
  const [follow, setFollow] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTaggedSubmissions, setShowTaggedSubmissions] = useState(false);
  const [taggedSubmissions, setTaggedSubmissions] = useState([]);
  const [taggedSubmissionsPaginator, setTaggedSubmissionsPaginator] = useState([]);

  const [isLoggedIn, loggedInUser] = useContext(LoginContext);
  const [lastEvent] = useContext(EventContext);
  const [theme] = useContext(ThemeContext);

  const _getUser = () => {
    getUser(match.params.id).then((res) => {
      setUser(res.user);
      setFollow(res.follow);
    });
  };

  useEffect(() => {
    if (lastEvent
      && lastEvent.event === EVENT.UPDATE_GALLERY
      && (loggedInUser.sub === parseInt(match.params.id, 10) || loggedInUser.username === match.params.id)
    ) {
      getSubmissions({ id: match.params.id }).then((res) => {
        setSubmissionsPaginator(res.submissions);
        setSubmissions(res.submissions.data);
      });
    }
  }, [lastEvent]);

  useEffect(() => {
    if (lastEvent && lastEvent.event === EVENT.UPDATE_PROFILE_USER) {
      _getUser();
    }
  }, [lastEvent]);

  useEffect(() => {
    _getUser();
  }, [isLoggedIn, match.params.id]);

  useEffect(() => {
    getSubmissions({ id: match.params.id }).then((res) => {
      setSubmissionsPaginator(res.submissions);
      setSubmissions(res.submissions.data);
    });
    getLikes({ id: match.params.id }).then((res) => {
      setLikesPaginator(res.likes);
      setLikes(res.likes.data);
    });
  }, [match.params.id]);

  const _loadMoreSubmissions = () => {
    getSubmissions({ id: match.params.id, page: submissionsPaginator.current_page + 1 })
      .then((res) => {
        setSubmissionsPaginator(res.submissions);
        setSubmissions(submissions.concat(res.submissions.data));
      });
  };

  const _loadMoreLikes = () => {
    getLikes({ id: match.params.id, page: likesPaginator.current_page + 1 })
      .then((res) => {
        setLikesPaginator(res.likes);
        setLikes(likes.concat(res.likes.data));
      });
  };

  const _loadMoreTaggedSubmissions = () => {
    getLikes({ page: taggedSubmissionsPaginator.current_page + 1, tagId: selectedTag.id })
      .then((res) => {
        setTaggedSubmissionsPaginator(res.submission);
        setTaggedSubmissions(taggedSubmissions.concat(res.submissions.data));
      });
  };

  const _selectPostsTab = useCallback(() => {
    setTabIndex(0);
  }, [setTabIndex]);

  const _selectLikesTab = useCallback(() => {
    setTabIndex(1);
  }, [setTabIndex]);

  const _selectTag = (tag) => {
    if (tag !== selectedTag || !showTaggedSubmissions) {
      setShowTaggedSubmissions(true);
      setSelectedTag(tag);
      getTaggedSubmissions({ page: 1, tagId: tag.id })
        .then((res) => {
          setTaggedSubmissionsPaginator(res.submission);
          setTaggedSubmissions(res.submissions.data);
        });
    }
  };

  if (!user && !userLoading && (!submissions || (submissions && !submissions.length))) {
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
      {user && (
        <ProfileHeader
          user={user}
          follow={follow}
          followUser={followUser}
          followUserLoading={followUserLoading}
          setFollow={setFollow}
        />
      )}

      <div className={cn(styles.tabs, styles[theme])}>
        <Button
          brand='ghost'
          square
          plainFocus
          className={cn(styles.tab, {
            [styles.active]: tabIndex === 0,
          })}
          onClick={_selectPostsTab}
          text='Posts'
        />
        <Button
          brand='ghost'
          square
          plainFocus
          className={cn(styles.tab, {
            [styles.active]: tabIndex === 1,
          })}
          onClick={_selectLikesTab}
          text='Likes'
        />
      </div>

      {tabIndex === 0 && (
        <>
          {user && user.tags.length > 0 && (
            <Layout className={styles.tags}>
              <SubmissionTags tags={user.tags} onClick={_selectTag} />
            </Layout>
          )}

          {showTaggedSubmissions && (
            <>
              <Layout className={styles.taggedInfoLabel}>
                <Button
                  brand='element'
                  className={styles.clearTaggedSubmissionsButton}
                  onClick={() => setShowTaggedSubmissions(false)}
                  text='Clear'
                />
                {`Submissions tagged `}
                <b>{selectedTag.text}</b>
                :
              </Layout>
            </>
          )}

          <Gallery
            big
            loading={showTaggedSubmissions ? submissionsLoading : taggedSubmissionsLoading}
            submissions={showTaggedSubmissions ? taggedSubmissions : submissions}
            padEmptyLabel
          />

          {((!showTaggedSubmissions && submissionsPaginator && submissionsPaginator.next_page_url && !submissionsLoading) // eslint-disable-line max-len
            || (showTaggedSubmissions && taggedSubmissionsPaginator && taggedSubmissionsPaginator.next_page_url && !taggedSubmissionsLoading) // eslint-disable-line max-len
          ) && (
            <div className={styles.moreButtonContainer}>
              <Button
                aria-label='Load more'
                round
                brand='base'
                className={styles.moreButton}
                noPadding
                onClick={showTaggedSubmissions ? _loadMoreTaggedSubmissions : _loadMoreSubmissions}
              >
                <KeyboardArrowDown />
              </Button>
            </div>
          )}

          {((!showTaggedSubmissions && submissions.length > 0 && submissionsPaginator && !submissionsPaginator.next_page_url) // eslint-disable-line max-len
          || (showTaggedSubmissions && taggedSubmissions.length > 0 && taggedSubmissionsPaginator && !taggedSubmissionsPaginator.next_page_url) // eslint-disable-line max-len
          ) && (
            <i className={styles.theEndLabel}>This is the end.</i>
          )}
        </>
      )}

      {tabIndex === 1 && (
        <>
          <Gallery
            big
            loading={likesLoading}
            submissions={likes}
            padEmptyLabel
            submissionInObject
          />

          {likesPaginator && likesPaginator.next_page_url && !likesLoading && (
            <div className={styles.moreButtonContainer}>
              <Button
                aria-label='Load more'
                round
                brand='base'
                className={styles.moreButton}
                noPadding
                onClick={_loadMoreLikes}
              >
                <KeyboardArrowDown />
              </Button>
            </div>
          )}

          {likes.length > 0 && likesPaginator && !likesPaginator.next_page_url && (
            <i className={styles.theEndLabel}>This is the end.</i>
          )}
        </>
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
