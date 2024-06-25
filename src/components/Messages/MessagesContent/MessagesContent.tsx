import { useDispatch, useSelector } from 'react-redux'
import './MessagesContent.scss'
import { getFriendsBack, receiveMessage } from '../../../store/features/friends/friendsSlice'
import Friend from '../../FriendsBar/Friend/Friend'
import { useEffect, useState, useRef } from 'react'
import MessageChat from '../MessageChat/MessageChat'
import MessageInput from '../MessageInput/MessageInput'
import { getMessages } from '../../../store/features/friends/friendThunks'
import { getAccessToken } from '../../../store/features/userInfo/userInfoSlice'
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../../../store/setup'

export default function MessagesContent() {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector(getFriendsBack)
  const [selectedFriendIndex, setSelectedFriendIndex] = useState<number>(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const [socket, setSocket] = useState<Socket>(null);
  const token = useSelector(getAccessToken);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://winkuback.onrender.com/', {
      auth: {
        token,
      },
    });

    // Handle received messages
    newSocket.on('receive_message', (data) => {
      dispatch(receiveMessage(data))
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', friends[selectedFriendIndex]?.friendshipId);
    }
  }, [friends, selectedFriendIndex, socket]);

  const selectFriend = (index: number) => {
    dispatch(getMessages(friends[index].id))
    setSelectedFriendIndex(index);
    socket.emit('join_room', friends[index].friendshipId);
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
          <img src={friends[selectedFriendIndex]?.pfp} alt={friends[selectedFriendIndex]?.fname} />
          <div className="content-info">
            <h4>{friends[selectedFriendIndex]?.fname}</h4>
            <span>{friends[selectedFriendIndex]?.onlineStatus}</span>
          </div>
        </div>

        <div className="chat" ref={chatRef}>
          {
            friends[selectedFriendIndex]?.messages.map(message => {
              return <MessageChat key={message.messageId} content={message} user={friends[selectedFriendIndex]} />
            })
          }
        </div>

        <MessageInput friend={friends[selectedFriendIndex]} socket={socket} />

      </div>
    </div>
  )
}
