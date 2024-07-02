import { useDispatch, useSelector } from 'react-redux'
import { getFriendsBack, getMessagesLoading, receiveMessage } from '../../../store/features/friends/friendsSlice'
import Friend from '../../FriendsBar/Friend/Friend'
import { useEffect, useState, useRef } from 'react'
import MessageChat from '../MessageChat/MessageChat'
import MessageInput from '../MessageInput/MessageInput'
import { getMessages } from '../../../store/features/friends/friendThunks'
import { getAccessToken } from '../../../store/features/userInfo/userInfoSlice'
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../../../store/setup'
import SecondaryLoader from '../../shared/SecondaryLoader/SecondaryLoader'
import './MessagesContent.scss'
const url = import.meta.env.VITE_BACK_BASE_URL;

export default function MessagesContent() {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector(getFriendsBack)
  const [selectedFriendIndex, setSelectedFriendIndex] = useState<number>(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageLoading = useSelector(getMessagesLoading)
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useSelector(getAccessToken);

  const initialLoad = useRef(true);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(url, {
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
    if (socket && friends.length > 0) {
      if (initialLoad.current) {
        selectFriend(0);
        initialLoad.current = false;
      } else {
        socket.emit('join_room', friends[selectedFriendIndex]?.friendshipId);
      }
    }
  }, [friends, selectedFriendIndex, socket]);

  const selectFriend = (index: number) => {
    dispatch(getMessages(friends[index].id))
    setSelectedFriendIndex(index);
    if (socket) {
      socket.emit('join_room', friends[index].friendshipId);
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [friends, selectedFriendIndex]);

  return (
    <div className={`${friends && friends.length === 0 ? "MessagesContent-nomessages" : ''} MessagesContent`}>
      {
        friends && friends.length === 0
          ? <p className='no-users'>add friends and have a chat!</p>
          : <><div className="MessagesContent__friends">
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

              <div className={`${messageLoading || friends[selectedFriendIndex]?.messages?.length === 0 ? "chat-loading" : ""} chat`} ref={chatRef}>
                {
                  (messageLoading && <SecondaryLoader />)
                  ||
                  (
                    friends[selectedFriendIndex]?.messages?.length === 0
                      ? <p className='no-users'>there are no messages here yet</p>
                      : friends[selectedFriendIndex]?.messages.map(message => {
                        return <MessageChat key={message.messageId} content={message} user={friends[selectedFriendIndex]} />
                      })
                  )
                }
              </div>

              <MessageInput friend={friends[selectedFriendIndex]} socket={socket} />
            </div></>
      }
    </div>
  )
}
