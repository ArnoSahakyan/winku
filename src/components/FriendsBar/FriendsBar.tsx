import { useState } from 'react';
import './FriendsBar.scss'
import Friend from './Friend/Friend';
import { useSelector } from 'react-redux';
import { getFriends } from '../../store/features/friendsSlice';
import Title from '../shared/Title/Title';

export default function FriendsBar() {

  const friends = useSelector(getFriends);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          filteredFriends.map(user => {
            return <Friend key={user.id} user={user} onlyImg={false} />
          })
        }
      </div>
    </div>
  )
}
