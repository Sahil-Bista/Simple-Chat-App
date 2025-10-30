import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000', { withCredentials: true });

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('accessToken');
  const { userId: otherUserId } = useParams();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setMyUserId(decoded.UserInfo.user);
    }
  }, [token]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
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
    fetchChats();
  }, []);

  useEffect(() => {
    if (!myUserId || !otherUserId) return;

    const roomId = [myUserId, otherUserId].sort().join('');

    const messageHandler = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.emit('join-room', roomId, otherUserId, myUserId);
    socket.on('message', messageHandler);

    return () => {
      socket.off('message', messageHandler);
    };
  }, [myUserId, otherUserId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {chatMembers.length > 0
          ? chatMembers.map((member, i) => (
              <ul key={i}>
                <li>{member.firstName}</li>
              </ul>
            ))
          : 'No chats made yet'}
      </div>
      <div>
        {messages.length > 0
          ? messages.map((msg, i) => <p key={i}>{msg.message}</p>)
          : 'No messages yet'}
      </div>
    </div>
  );
};

export default Chat;
