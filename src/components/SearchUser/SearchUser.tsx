import { useCallback, useState } from 'react';
import IconSearch from '../shared/Icons/IconSearch';
import './SearchUser.scss';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../store/features/userInfo/userThunks';
import { debounce } from 'lodash';
import Friend from '../FriendsBar/Friend/Friend';

export default function SearchUser() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const limit = 4;

  const debouncedSearch = useCallback(
    debounce((term, newOffset = 0) => {
      if (term) {
        setLoading(true);
        setError(null);
        dispatch(searchUsers({ query: term, limit, offset: newOffset }))
          .then(({ payload }) => {
            if (newOffset === 0) {
              setResults(payload.users);
            } else {
              setResults(prevResults => [...prevResults, ...payload.users]);
            }
            setOffset(newOffset + limit);
            setHasMore(payload.currentPage < payload.totalPages);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message || 'Failed to fetch users');
            setLoading(false);
          });
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
    <>
      <a onClick={() => setSearchOpen(!searchOpen)}>
        <IconSearch />
      </a>

      <div className='SearchUser'>
        <input className={`${searchOpen ? 'active' : 'inactive'} searchFriend`}
          type="search"
          name="search"
          id="search"
          placeholder='Search User'
          value={searchTerm}
          onChange={handleChange}
        />


        {
          results.length > 0 &&
          <div className={`${searchOpen ? 'active' : 'inactive'} SearchUser__results`}>
            {error && <p>Error: {error}</p>}
            {results?.map((user) => (
              <Friend key={user.id} user={user} onlyImg={false} />
            ))}
            {hasMore && (!loading ? (
              <p className='load' onClick={handleLoadMore}>Load More</p>
            )
              : <p className='load'>...Loading</p>)
            }
          </div>
        }
      </div>
    </>
  )
}
