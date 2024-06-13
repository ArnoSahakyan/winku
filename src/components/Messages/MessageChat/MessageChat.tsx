import { useSelector } from 'react-redux';
import { TFriend, TMessages } from '../../../store/features/friends/friendsSlice'
import './MessageChat.scss'
import { getPfp } from '../../../store/features/userInfo/userInfoSlice';

interface IMessageChat {
  content: TMessages;
  user: TFriend;
}

export default function MessageChat({ content, user }: IMessageChat) {
  const pfp = useSelector(getPfp)
  return (
    <>
      {
        content.senderId === 'friend' ?
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
