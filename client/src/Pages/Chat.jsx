import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ChatForm from '../components/ChatForm';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket.js';
import ChatMembers from '../components/ChatMembers.jsx';
import Messages from '../components/Messages.jsx';
import Header from '../components/Header.jsx';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState('');

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
        setChatMembers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChatMembers();
  }, [myUserId, token]);

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
      <Header />
      <div style={{ flex: 1 }}>
        <ChatMembers myUserId={myUserId} chatMembers={chatMembers} />
      </div>
      <div style={{ flex: 1 }}>
        <Messages messages={messages} />
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
