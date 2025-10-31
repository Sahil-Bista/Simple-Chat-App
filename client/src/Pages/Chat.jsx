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
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-white border-b border-gray-300 px-4 h-16">
        <Header />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-gray-100 border-r border-gray-300 flex-shrink-0">
          <ChatMembers myUserId={myUserId} chatMembers={chatMembers} />
        </aside>
        <main className="flex-1 flex flex-col bg-gray-50 h-screen">
          <div className="flex-1 overflow-y-auto p-4">
            <Messages messages={messages} myUserId={myUserId} />
          </div>
          <div className="border-t border-gray-300 p-2">
            <ChatForm
              receiverId={userId}
              senderId={myUserId}
              messageHandler={messageHandler}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
