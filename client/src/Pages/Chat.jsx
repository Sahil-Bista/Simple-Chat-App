import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('accessToken');
  const otherUserId = useParams();
  if (token) {
    const decoded = jwtDecode(token);
    setMyUserId(decoded.UserInfo.user);
  }

  const roomId = [myUserId, otherUserId].sort().join('');

  const messageHandler = (message) => {
    setMessages((prevMessages) => [...setMessages, message]);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat');
        console.log('Hello');
        const data = response.data;
        console.log(data);
        setChatMembers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    socket.emit('room-join', roomId, otherUserId, myUserId);

    socket.on('message', (message) => {
      console.log('message recevied', message);
      messageHandler({
        senderId: otherUserId,
        receiverId: myUserId,
        message,
        createdAt: new Date(),
      });
    });
  }, [myUserId, otherUserId, roomId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {chatMembers.map((members) => {
          <ul>
            <li>{members}</li>
          </ul>;
        })}
      </div>
      <div>{messages && { messages }}</div>
    </div>
  );
};

export default Chat;
