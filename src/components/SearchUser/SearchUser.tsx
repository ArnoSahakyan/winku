/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import IconSearch from '../shared/Icons/IconSearch';
import { useDispatch } from 'react-redux';
import { TsearchedUsers, searchUsers } from '../../store/features/userInfo/userThunks';
import { debounce } from 'lodash';
import Friend from '../FriendsBar/Friend/Friend';
import { AppDispatch } from '../../store/setup';
import SecondaryLoader from '../shared/SecondaryLoader/SecondaryLoader';
import './SearchUser.scss';

export default function SearchUser() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<TsearchedUsers[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const limit = 4;

  const debouncedSearch = useCallback(
    debounce((term: string, newOffset: number = 0) => {
      if (!term.trim()) {
        setResults(undefined);
        return;
      }
      if (term) {
        setLoading(true);
        setError(null);
        dispatch(searchUsers({ query: term, limit, offset: newOffset }))
          .then((action) => {
            if (searchUsers.fulfilled.match(action)) {
              const { payload } = action;

              if (newOffset === 0) {
                setResults(payload.users);
              } else {
                setResults(prevResults => [...prevResults, ...payload.users]);
              }
              setOffset(newOffset + limit);
              setHasMore(payload.currentPage < payload.totalPages);
            }
          })
          .catch((err) => {
            setError(err.message || 'Failed to fetch users');
          })
          .finally(() => {
            setLoading(false);
          })
      } else {
        setResults([]);
      }
    }, 300), [dispatch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setOffset(0);
    debouncedSearch(term);
  };

  const handleLoadMore = () => {
    debouncedSearch(searchTerm, offset);
  };

  return (
    <div className='SearchUser'>
      <a onClick={() => setSearchOpen(!searchOpen)}>
        <IconSearch />
      </a>
      <div className='SearchUser__input'>
        <input className={`${searchOpen ? 'active' : 'inactive'} searchFriend`}
          type="text"
          name="search"
          id="search"
          placeholder='Search User'
          value={searchTerm}
          onChange={handleChange}
        />
        {loading && <SecondaryLoader />}
      </div>
      {
        results &&
        <div className={`${searchOpen ? 'active' : 'inactive'} SearchUser__results`}>
          {error && <p>Error: {error}</p>}
          {
            !loading && (results.length > 0 ? results.map((user) => (
              <Friend key={user.id} user={user} onlyImg={false} />
            ))
              : <p className='no-users'>No Users Available</p>)
          }
          {hasMore && (!loading ? (
            <p className='load' onClick={handleLoadMore}>Load More</p>
          )
            : <p className='load'>...Loading</p>)
          }
        </div>
      }
    </div>
  )
}
