import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ChatForm from '../components/ChatForm';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket.js';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const navigate = useNavigate();

  const messageHandler = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const { userId } = useParams();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setMyUserId(decoded.UserInfo.user);
    }
  }, [token]);

  useEffect(() => {
    const fetchChatMembers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/chat',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true }
        );
        console.log('chat members', response.data.data);
        setChatMembers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChatMembers();
  }, [token]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/chat/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log('lol', result.data.data);
        setMessages(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]);

  useEffect(() => {
    const handleReceiveMessages = (message) => {
      console.log('received message', message);
      messageHandler({
        senderId: userId,
        receiverId: myUserId,
        message,
        createdAt: new Date(),
      });
    };
    socket.on('receiveMessage', handleReceiveMessages);

    //we need to pass the reference of the funciton to let the system know which listener to remove
    return () => {
      socket.off('receiveMessage', handleReceiveMessages);
    };
  }, [myUserId, userId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        {chatMembers.length > 0
          ? chatMembers.map((member) => (
              <ul key={member._id}>
                <button onClick={() => navigate(`/chat/${member._id}`)}>
                  {member.firstName}
                </button>
              </ul>
            ))
          : 'No chats made yet'}
      </div>
      <div style={{ flex: 1 }}>
        {messages.length > 0
          ? messages.map((message) => (
              <ul key={message._id}>
                <li>{message.message}</li>
              </ul>
            ))
          : 'No chats made yet'}
        <ChatForm
          receiverId={userId}
          senderId={myUserId}
          messageHandler={messageHandler}
        />
      </div>
    </div>
  );
};

export default Chat;
