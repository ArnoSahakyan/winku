import { TFriend, TMessages } from '../../../store/features/friendsSlice'
import './MessageChat.scss'

interface IMessageChat {
  content: TMessages;
  user: TFriend;
}

export default function MessageChat({ content, user }: IMessageChat) {
  return (
    <>
      {
        content.senderId === 'friend' ?
          <div className='MessageChat friend'>
            <img src={user.img} />
            <p>{content.message}</p>
          </div>
          : <div className='MessageChat user'>
            <p>{content.message}</p>
            <img src='/pfp.jpg' />
          </div>
      }
    </>
  )
}
