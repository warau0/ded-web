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

import { ThemeContext, LoginContext, EventContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API, STORAGE, EVENT } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';

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
}) => {
  const [updateAvatar, updateAvatarLoading] = useApi(API.AVATAR.POST);
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar.url : null);
  const [randomPattern, setRandomPattern] = useState(
    patterns[Math.floor(Math.random() * patterns.length)],
  );
  const [theme] = useContext(ThemeContext);
  const [_, loggedInUser] = useContext(LoginContext);
  const [__, fireEvent] = useContext(EventContext);
  const avatarInput = useRef(null);

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

  const _renderAvatar = () => {
    if (loggedInUser && loggedInUser.sub === user.id) {
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
      {_renderAvatar()}
      <h1 className={styles.username}>{user.username}</h1>
    </div>
  );
});

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProfileHeader;
