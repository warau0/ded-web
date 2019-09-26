import React, { useEffect, useState, useContext } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { toast } from 'react-toastify';

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
  const [search, searchLoading] = useApi(API.USERS.SEARCH);

  const [users, setUsers] = useState([]);
  const [paginator, setPaginator] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchPaginator, setSearchPaginator] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);

  useEffect(() => {
    getUsers(1).then((res) => {
      setPaginator(res.users);
      setUsers(res.users.data);
    });
  }, []);

  const _loadMore = () => {
    if (showSearchResult) {
      search({ page: searchPaginator.current_page + 1, query }).then((res) => {
        setSearchPaginator(res.users);
        setSearchResult(searchResult.concat(res.users.data));
      });
    } else {
      getUsers(paginator.current_page + 1).then((res) => {
        setPaginator(res.users);
        setUsers(users.concat(res.users.data));
      });
    }
  };

  const _search = () => {
    search({ page: 1, query }).then((res) => {
      setShowSearchResult(true);
      setSearchPaginator(res.users);
      setSearchResult(res.users.data);
    }).catch(e => toast.error(e.message));
  };

  const _removeSearchResult = () => {
    setSearchPaginator(null);
    setSearchResult([]);
    setShowSearchResult(false);
  };

  return (
    <Layout>
      <div className={cn(styles.searchContainer, styles[theme])}>
        <input maxLength={225} onChange={e => setQuery(e.target.value)} value={query} placeholder='...' />
        <Button loading={searchLoading} disabled={!query || searchLoading} onClick={_search}>Search</Button>
        {showSearchResult && (
          <Button className={styles.clearButton} brand='mono' onClick={_removeSearchResult}>Clear</Button>
        )}
      </div>

      {showSearchResult && searchPaginator && (
        <div className={styles.searchResultLabel}>
          {searchPaginator.total > 0
            ? `${searchPaginator.total} match${searchPaginator.total !== 1 ? 'es' : ''}:`
            : 'No results.'}
        </div>
      )}

      <div className={cn(styles.userContainer, styles[theme])}>
        {(showSearchResult ? searchResult : users).map(user => (
          <Link key={user.id} to={`/user/${user.username}`} className={styles.user}>
            <div className={styles.username}>{user.username}</div>
            <img src={user.avatar ? user.avatar.url : defaultAvatar} alt='avatar' className={styles.avatar} />
          </Link>
        ))}
      </div>

      {(usersLoading || searchLoading) && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      {((!showSearchResult && paginator && paginator.next_page_url && !usersLoading)
        || (showSearchResult && searchPaginator && searchPaginator.next_page_url && !searchLoading)
      ) && (
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

      {((!showSearchResult && users.length > 0 && paginator && !paginator.next_page_url)
        || (showSearchResult && searchResult.length > 0 && searchPaginator && !searchPaginator.next_page_url)
      ) && (
        <i className={styles.theEndLabel}>This is the end.</i>
      )}
    </Layout>
  );
};
