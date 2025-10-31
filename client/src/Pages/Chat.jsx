import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ChatForm from '../components/ChatForm';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket.js';
import ChatMembers from '../components/ChatMembers.jsx';
import Messages from '../components/Messages.jsx';
import Header from '../components/Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      try {
        const decoded = jwtDecode(token);
        setMyUserId(decoded.UserInfo.user);
      } catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        toast.error('Invalid token. Please login again.', { autoClose: 5000 });
        navigate('/login');
      }
    } else {
      toast.info('You must be logged in to access chats.', { autoClose: 5000 });
      navigate('/login');
    }
  }, [token, navigate]);

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
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-gray-100 border-r border-gray-300 flex-shrink-0">
          {chatMembers.length > 0 ? (
            <ChatMembers myUserId={myUserId} chatMembers={chatMembers} />
          ) : (
            <div className="p-4 text-gray-500">
              No chats yet.{' '}
              <Link to="/users" className="text-blue-500 hover:underline">
                Click here to start a chat
              </Link>
              .
            </div>
          )}
        </aside>

        <main className="flex-1 flex flex-col bg-gray-50 h-screen">
          {userId ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length > 0 ? (
                  <Messages messages={messages} myUserId={myUserId} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">
                    No messages yet. Start the conversation.
                  </div>
                )}
              </div>
              <div className="border-t border-gray-300 p-2">
                <ChatForm
                  receiverId={userId}
                  senderId={myUserId}
                  messageHandler={messageHandler}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-500">
              No chats selected.{' '}
              <Link to="/users" className="text-blue-500 hover:underline">
                Click a user to start chatting
              </Link>
              .
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
