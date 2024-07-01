import { useEffect, useState } from 'react';
import './FriendsBar.scss'
import Friend from './Friend/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsBack, getFriendsLoading } from '../../store/features/friends/friendsSlice';
import Title from '../shared/Title/Title';
import { getFriendsApi } from '../../store/features/friends/friendThunks';
import { AppDispatch } from '../../store/setup';
import FriendSkeleton from '../shared/Skeletons/FriendSkeleton';

export default function FriendsBar() {
  const dispatch = useDispatch<AppDispatch>()
  const friends = useSelector(getFriendsBack);
  const loading = useSelector(getFriendsLoading)
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFriends = friends.filter((friend) =>
    friend.fname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(getFriendsApi())
  }, [dispatch])

  return (
    <div className='FriendsBar'>
      <Title title={<>Friends</>} />

      <div className="FriendsBar__search">
        <form>
          <input
            type="text"
            placeholder="Search friends..."
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="FriendsBar__list">
        {
          (loading && filteredFriends.length === 0 && <>
            <FriendSkeleton />
            <FriendSkeleton />
          </>)
          ||
          (filteredFriends.length > 0
            ? filteredFriends.map(user => {
              return <Friend key={user.id} user={user} onlyImg={false} />
            })
            : <h4 className='no-users'>No friends available</h4>)
        }
      </div>
    </div>
  )
}
