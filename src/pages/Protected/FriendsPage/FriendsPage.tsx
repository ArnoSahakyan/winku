import { useSelector } from 'react-redux'
import './FriendsPage.scss'
import { getFriends, getRequests } from '../../../store/features/friendsSlice'
import { useState } from 'react'
import FriendBar from './FriendBar'

export default function FriendsPage() {

  const friends = useSelector(getFriends)
  const requests = useSelector(getRequests)

  const [activePage, setActivePage] = useState('friends')

  return (
    <div className='FriendsPage'>
      <div className="FriendsPage__select">
        <h4
          className={activePage === 'friends' ? 'active' : ''}
          onClick={() => setActivePage('friends')}>
          My Friends <span>{friends.length}</span>
        </h4>
        <h4
          className={activePage === 'requests' ? 'active' : ''}
          onClick={() => setActivePage('requests')}>
          Friend Requests <span>{requests.length}</span>
        </h4>
      </div>
      <div className="FriendsPage__list">
        {
          activePage === 'friends' ?
            friends.map((friend) => {
              return <FriendBar key={friend.id} data={friend} isFriend={true} />
            })
            : requests.map((request) => {
              return <FriendBar key={request.id} data={request} isFriend={false} />
            })
        }
      </div>
    </div>
  )
}
