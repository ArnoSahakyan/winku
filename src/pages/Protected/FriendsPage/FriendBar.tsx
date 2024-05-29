import { TFriend, TRequest } from '../../../store/features/friendsSlice';
import './FriendBar.scss'

interface FriendBarProps {
  data: TFriend | TRequest;
  isFriend: boolean;
}

export default function FriendBar({ data, isFriend }: FriendBarProps) {
  return (
    <div className='FriendBar'>
      <div className="FriendBar__content">
        <img src={data.img} alt='profile picture' />
        <div className="name">
          <h5>{data.name}</h5>
          <span>{data.job}</span>
        </div>
      </div>
      <div className="FriendBar__btns">
        {isFriend ?
          <>
            <label htmlFor={`decline-${data.id}`}>
              <span className='span-decline'>&#xF659;</span>
              <input type='button' id={`decline-${data.id}`} className='decline' value="Unfriend" />
            </label>
            <label htmlFor={`confirm-${data.id}`}>
              <span className='span-confirm'>&#xF633;</span>
              <input type='button' id={`confirm-${data.id}`} className='confirm' value="Add Friend" />
            </label>
          </>
          :
          <>
            <label htmlFor={`decline-${data.id}`}>
              <span className='span-decline'>&#xF659;</span>
              <input type='button' id={`decline-${data.id}`} className='decline' value="Delete Request" />
            </label>
            <label htmlFor={`confirm-${data.id}`}>
              <span className='span-confirm'>&#xF633;</span>
              <input type='button' id={`confirm-${data.id}`} className='confirm' value="Confirm" />
            </label>
          </>
        }
      </div>
    </div>
  )
}
