import './RightSidebar.scss'
import Friend from '../FriendsBar/Friend/Friend';
import { useSelector } from 'react-redux';
import { getFriendsBack } from '../../store/features/friends/friendsSlice';


export default function RightSidebar() {

  const friends = useSelector(getFriendsBack)

  return (
    <div className='RightSidebar'>
      <div className="RightSidebar__friends">
        {
          friends.map(user => {
            return <Friend key={user.id} user={user} onlyImg={true} />
          })
        }
      </div>
    </div>
  )
}