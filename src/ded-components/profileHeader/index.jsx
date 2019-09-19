import React, {
  memo,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

import { ThemeContext, LoginContext, EventContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API, STORAGE, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';
import SocialLink from 'ded-components/socialLink';
import Button from 'ded-components/button';

import * as styles from './styles.pcss';

const patterns = [
  'pattern_1',
  'pattern_2',
  'pattern_3',
  'pattern_4',
  'pattern_5',
  'pattern_6',
  'pattern_7',
];

const ProfileHeader = memo(({
  user,
  follow,
  followUser,
  followUserLoading,
  setFollow,
}) => {
  const [updateAvatar, updateAvatarLoading] = useApi(API.AVATAR.POST);
  const [postSocialLink, postSocialLinkLoading] = useApi(API.SOCIAL_LINKS.POST);
  const [deleteSocialLink, deleteSocialLinkLoading] = useApi(API.SOCIAL_LINKS.DELETE);

  const [avatar, setAvatar] = useState(user.avatar ? user.avatar.url : null);
  const [randomPattern, setRandomPattern] = useState(
    patterns[Math.floor(Math.random() * patterns.length)],
  );
  const [addingLink, setAddingLink] = useState(false);
  const [newLink, setNewLink] = useState('');

  const [theme] = useContext(ThemeContext);
  const [isLoggedIn, loggedInUser] = useContext(LoginContext);
  const [__, fireEvent] = useContext(EventContext);
  const avatarInput = useRef(null);

  const ownProfile = loggedInUser && loggedInUser.sub === user.id;

  useEffect(() => {
    let unusedPatterns = patterns.filter(p => p !== randomPattern);
    if (!unusedPatterns) {
      unusedPatterns = patterns;
    }

    setRandomPattern(unusedPatterns[Math.floor(Math.random() * unusedPatterns.length)]);
  }, [user.id]);

  const _onAvatarSelect = (event) => {
    const file = event.target.files[0];

    const mb = parseFloat(file.size / 1024 / 1024).toFixed(2);
    if (mb > 3) {
      toast.error(`${file.name} is too big: ${mb} MB, max: 3 MB.`);
      avatarInput.current.value = null;
    } else {
      const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (fileTypes.indexOf(file.type) !== -1) {
        const uploadForm = new FormData();
        uploadForm.append('has_data', 1); // Track if backend receives data.
        uploadForm.append('avatar', file);

        updateAvatar(null, uploadForm, false).then((res) => {
          window.localStorage.setItem(STORAGE.AVATAR, res.avatar.url);
          setAvatar(res.avatar.url);
          fireEvent(EVENT.UPDATE_AVATAR);
          avatarInput.current.value = null;
        }).catch((e) => {
          toast.error(e.message);
          avatarInput.current.value = null;
        });
      } else {
        toast.error(`${file.name} is not an image (jpg, png, gif).`);
        avatarInput.current.value = null;
      }
    }
  };

  const _postSocialLink = () => postSocialLink(null, { link: newLink })
    .then(() => {
      setNewLink('');
      setAddingLink(false);
      fireEvent(EVENT.UPDATE_PROFILE_USER);
    })
    .catch(e => toast.error(e.message));

  const _deleteSocialLink = id => deleteSocialLink(id)
    .then(() => fireEvent(EVENT.UPDATE_PROFILE_USER))
    .catch(e => toast.error(e.message));

  const _followUser = () => followUser(user.id, { follow: !follow })
    .then((res) => {
      setFollow(res.follow);
    });

  const _renderAvatar = () => {
    if (ownProfile) {
      return (
        <>
          <label htmlFor='avatar' className={styles.avatarInput}>
            <div className={cn(styles.tint, { [styles.show]: updateAvatarLoading })}>
              {updateAvatarLoading ? (
                <Loader />
              ) : (
                <Edit />
              )}
            </div>
            <img src={avatar || defaultAvatar} alt='avatar' className={styles.avatar} />
            <input
              ref={avatarInput}
              type='file'
              name='avatar'
              id='avatar'
              className={styles.hiddenInput}
              onChange={_onAvatarSelect}
            />
          </label>
        </>
      );
    }

    return (
      <img src={avatar || defaultAvatar} alt='avatar' className={styles.avatar} />
    );
  };

  return (
    <div className={cn(styles.header, styles[theme], styles[randomPattern])}>
      <div className={styles.userInfo}>
        {_renderAvatar()}
        <h1 className={styles.username}>
          {user.username}
          {isLoggedIn && !ownProfile && (
            <div className={styles.followButtonContainer}>
              <Button
                onClick={_followUser}
                className={styles.followButton}
                loading={followUserLoading}
                brand={follow ? 'mono' : 'base'}
              >
                {follow ? <RemoveCircleOutline /> : <AddCircleOutline />}
                {follow ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          )}
        </h1>
      </div>

      {user.social_links && user.social_links.map(link => (
        <div key={link.id} className={styles.socialLinkContainer}>
          <SocialLink url={link.link} />
          {ownProfile && (
            <Button className={styles.deleteLinkButton} disabled={deleteSocialLinkLoading} brand='mono' onClick={() => _deleteSocialLink(link.id)}>
              <RemoveCircleOutline />
            </Button>
          )}
        </div>
      ))}

      {ownProfile && user.social_links && user.social_links.length < 5 && (
        <>
          {!addingLink && (
            <Button brand='mono' onClick={() => setAddingLink(true)} className={styles.addLink}>
              <AddCircleOutline />
              Add link
            </Button>
          )}
          {addingLink && (
            <div>
              <input
                className={styles.newLinkInput}
                onChange={e => setNewLink(e.target.value)}
                onKeyUp={(e) => { if (e.key === 'Enter') _postSocialLink(); }}
                value={newLink}
                placeholder='...'
              />
              <Button className={styles.newLinkButton} loading={postSocialLinkLoading} disabled={!newLink} brand='success' onClick={_postSocialLink}>
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ProfileHeader.defaultProps = {
  follow: null,
  followUserLoading: false,
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    social_links: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      link: PropTypes.string,
    })),
  }).isRequired,
  follow: PropTypes.shape({
    user_id: PropTypes.number,
    follow_id: PropTypes.number,
  }),
  followUser: PropTypes.func.isRequired,
  followUserLoading: PropTypes.bool,
  setFollow: PropTypes.func.isRequired,
};

export default ProfileHeader;
