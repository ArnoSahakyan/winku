import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getAccessToken, getUserID } from '../../../store/features/userInfo/userInfoSlice';
import './Chat.scss';

export default function Chat() {
  const [room, setRoom] = useState('');
  const [friend, setFriend] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const token = useSelector(getAccessToken);
  const userId = useSelector(getUserID); // Assume this selector gets the logged-in user's ID

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:8080', {
      auth: {
        token,
      },
    });

    // Handle received messages
    newSocket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [token]);

  const joinRoom = () => {
    if (friend && room && socket) {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && friend && room && socket) {
      const messageData = {
        message: newMessage.trim(),
        receiverId: friend,
        room,
        senderId: userId, // Include the sender ID
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Update messages locally for immediate feedback
      setNewMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="Chat">
      <input
        type="text"
        placeholder="Friend ID"
        value={friend}
        onChange={(e) => setFriend(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <div className="Chat__messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <textarea
        className="Chat__input"
        placeholder="Write your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
