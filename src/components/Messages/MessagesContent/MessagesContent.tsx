import { useSelector } from 'react-redux'
import './MessagesContent.scss'
import { getFriends } from '../../../store/features/friends/friendsSlice'
import Friend from '../../FriendsBar/Friend/Friend'
import { useEffect, useState, useRef } from 'react'
import MessageChat from '../MessageChat/MessageChat'
import MessageInput from '../MessageInput/MessageInput'

export default function MessagesContent() {

  const friends = useSelector(getFriends)
  const chatRef = useRef<HTMLDivElement>(null);

  const [selectedFriendIndex, setSelectedFriendIndex] = useState<number>(0);

  const selectFriend = (index: number) => {
    setSelectedFriendIndex(index);
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [friends, selectedFriendIndex]);

  return (
    <div className='MessagesContent'>
      <div className="MessagesContent__friends">
        {
          friends.map((friend, index) => {
            return <div key={friend.id} className="friend" onClick={() => selectFriend(index)}>
              <Friend user={friends[index]} onlyImg={false} />
            </div>
          })
        }
      </div>
      <div className="MessagesContent__box">
        <div className="content">
          <img src={friends[selectedFriendIndex]?.pfp} alt={friends[selectedFriendIndex].fname} />
          <div className="content-info">
            <h4>{friends[selectedFriendIndex]?.fname}</h4>
            <span>{friends[selectedFriendIndex]?.onlineStatus}</span>
          </div>
        </div>

        <div className="chat" ref={chatRef}>
          {
            friends[selectedFriendIndex]?.messages.map(message => {
              return <MessageChat key={message.id} content={message} user={friends[selectedFriendIndex]} />
            })
          }
        </div>

        <MessageInput friend={friends[selectedFriendIndex]} />

      </div>
    </div>
  )
}
