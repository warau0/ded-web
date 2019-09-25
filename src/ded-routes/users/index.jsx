import React, { useEffect, useState, useContext } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { defaultAvatar } from 'ded-assets';
import { useApi } from 'ded-hooks';
import { API } from 'ded-constants';
import { ThemeContext } from 'ded-context';
import Layout from 'ded-components/layout';
import Button from 'ded-components/button';
import Loader from 'ded-components/loader';

import * as styles from './styles.pcss';

export default () => {
  const [theme] = useContext(ThemeContext);

  const [getUsers, usersLoading] = useApi(API.USERS.INDEX);

  const [users, setUsers] = useState([]);
  const [paginator, setPaginator] = useState(null);

  useEffect(() => {
    getUsers(1).then((res) => {
      setPaginator(res.users);
      setUsers(res.users.data);
    });
  }, []);

  const _loadMore = () => {
    getUsers(paginator.current_page + 1).then((res) => {
      setPaginator(res.users);
      setUsers(users.concat(res.users.data));
    });
  };

  return (
    <Layout>
      <div className={cn(styles.userContainer, styles[theme])}>
        {users.map(user => (
          <Link key={user.id} to={`/user/${user.username}`} className={styles.user}>
            <div className={styles.username}>{user.username}</div>
            <img src={user.avatar ? user.avatar.url : defaultAvatar} alt='avatar' className={styles.avatar} />
          </Link>
        ))}
      </div>

      {usersLoading && <div className={styles.loaderContainer}><Loader /></div>}

      {paginator && paginator.next_page_url && !usersLoading && (
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

      {users.length > 0 && paginator && !paginator.next_page_url && (
        <i className={styles.theEndLabel}>This is the end.</i>
      )}
    </Layout>
  );
};
