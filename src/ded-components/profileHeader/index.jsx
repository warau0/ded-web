import React, { memo, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';

import { ThemeContext, LoginContext } from 'ded-context';
import { defaultAvatar } from 'ded-assets';
import { API } from 'ded-constants';
import { useApi } from 'ded-hooks';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

const ProfileHeader = memo(({
  user,
}) => {
  const [updateAvatar, updateAvatarLoading] = useApi(API.AVATAR.POST);
  const [theme] = useContext(ThemeContext);
  const [_, loggedInUser] = useContext(LoginContext);

  const _onAvatarSelect = (event) => {
    const file = event.target.files[0];

    const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (fileTypes.indexOf(file.type) !== -1) {
      const uploadForm = new FormData();
      uploadForm.append('avatar', file);

      updateAvatar(null, uploadForm, false).then((res) => {
        console.log('updated avatar', res); // TODO Update localStorage with url from response
      }).catch(() => {});
    }
  };

  const _renderAvatar = () => {
    if (loggedInUser && loggedInUser.sub === user.id) {
      return (
        <>
          <label htmlFor='avatar' className={styles.avatarInput}>
            <div className={cn(styles.tint, { [styles.show]: updateAvatarLoading })}>
              {updateAvatarLoading ? (
                <Loader size='sm' />
              ) : (
                <Edit />
              )}
            </div>
            <img src={user.avatar ? user.avatar.url.replace('{userID}', user.id) : defaultAvatar} alt='avatar' className={styles.avatar} />
            <input
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
      <img src={defaultAvatar} alt='avatar' className={styles.avatar} />
    );
  };

  return (
    <div className={cn(styles.userCard, styles[theme])}>
      <div>{_renderAvatar()}</div>
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
