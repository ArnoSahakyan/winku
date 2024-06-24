import { useSelector } from 'react-redux';
import { TFriendBack, TMessages } from '../../../store/features/friends/friendsSlice'
import './MessageChat.scss'
import { getPfp, getUserID } from '../../../store/features/userInfo/userInfoSlice';

interface IMessageChat {
  content: TMessages;
  user: TFriendBack;
}

export default function MessageChat({ content, user }: IMessageChat) {
  const userId = useSelector(getUserID)
  const pfp = useSelector(getPfp)
  return (
    <>
      {
        content.senderId != userId ?
          <div className='MessageChat friend'>
            <img src={user.pfp} alt={user.fname} />
            <p>{content.message}</p>
          </div>
          : <div className='MessageChat user'>
            <p>{content.message}</p>
            <img src={pfp} alt='profile picture' />
          </div>
      }
    </>
  )
}
