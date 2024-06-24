import { useDispatch } from 'react-redux';
import { TFriendBack, TRequest, Tunassocitaed } from '../../../store/features/friends/friendsSlice';
import './FriendBar.scss'
import { deleteFriend, respondRequest, sendRequest } from '../../../store/features/friends/friendThunks';
import { useState } from 'react';
import { AppDispatch } from '../../../store/setup';

interface FriendBarProps {
  data: TFriendBack | TRequest | Tunassocitaed;
  isFriend: 'friend' | 'request' | 'none';
}

export default function FriendBar({ data, isFriend }: FriendBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [sentFriend, setSentFriend] = useState(false);
  const id = (isFriend === 'friend' || isFriend === 'none') ? (data as TFriendBack).id : (data as TRequest).senderId;
  const fname = (isFriend === 'friend' || isFriend === 'none') ? (data as TFriendBack).fname : (data as TRequest).fname;
  const pfp = (isFriend === 'friend' || isFriend === 'none') ? (data as TFriendBack).pfp : (data as TRequest).pfp;
  const job = (isFriend === 'friend' || isFriend === 'none') ? (data as TFriendBack).job : null;

  const handleUnfriend = (friendId: number) => {
    dispatch(deleteFriend(friendId))
  }

  const handleAddFriend = (receiverId: number) => {
    dispatch(sendRequest(receiverId))
      .then(() => setSentFriend(true))
  }

  const handleRequest = (status: string, senderId: number) => {
    const data = {
      senderId,
      status
    }
    dispatch(respondRequest(data))
  }

  return (
    <div className='FriendBar'>
      <div className="FriendBar__content">
        <img src={pfp} alt='profile picture' />
        <div className="name">
          <h5>{fname}</h5>
          {isFriend && <span>{job}</span>}
        </div>
      </div>
      <div className="FriendBar__btns">
        {isFriend === 'friend' && (
          <label htmlFor={`decline-${id}`}>
            <span className='span-decline'>&#xF659;</span>
            <input type='button' id={`decline-${id}`} className='decline' value="Unfriend" onClick={() => handleUnfriend(id)} />
          </label>
        )}
        {isFriend === 'request' && (
          <>
            <label htmlFor={`decline-${id}`}>
              <span className='span-decline'>&#xF659;</span>
              <input type='button' id={`decline-${id}`} className='decline' value="Delete Request" onClick={() => handleRequest('rejected', id)} />
            </label>
            <label htmlFor={`confirm-${id}`}>
              <span className='span-confirm'>&#xF633;</span>
              <input type='button' id={`confirm-${id}`} className='confirm' value="Confirm" onClick={() => handleRequest('accepted', id)} />
            </label>
          </>
        )}
        {isFriend === 'none' && (
          <>
            <label htmlFor={`confirm-${id}`}>
              <span className={`${sentFriend ? 'disabled' : ''} span-confirm`}>&#xF633;</span>
              {
                sentFriend
                  ? <input type='button' disabled={true} id={`confirm-${id}`} className='confirm' value="Request Sent" />
                  : <input type='button' id={`confirm-${id}`} className='confirm' value="Add Friend" onClick={() => handleAddFriend(id)} />
              }
            </label>
          </>
        )}
      </div>
    </div>
  );
}
