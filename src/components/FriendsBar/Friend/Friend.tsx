import { TFriendBack } from '../../../store/features/friends/friendsSlice';
import './Friend.scss'


type FriendProps = {
  user: TFriendBack;
  onlyImg: boolean
}

export default function Friend({ user, onlyImg }: FriendProps) {
  return (
    <div className='Friend'>
      <div className="Friend__img">
        <img src={user.pfp} alt={user.fname} />
        <div className={`status ${user.onlineStatus}`}></div>
      </div>
      {
        onlyImg ? null
          : <div className="Friend__content">
            <h6>{user.fname}</h6>
            <p>{user.email}</p>
          </div>
      }

    </div>
  )
}
