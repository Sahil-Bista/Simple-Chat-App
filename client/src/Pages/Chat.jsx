import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const { userId } = useParams();

  const token = localStorage.getItem('accessToken');

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
        console.log(response.data.data);
        setChatMembers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChatMembers();
  }, [token]);

  useEffect(() => {
    console.log('sup man');
    console.log(userId);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
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
      <div>
        {messages.length > 0
          ? messages.map((message) => (
              <ul key={message._id}>
                <li>{message.message}</li>
              </ul>
            ))
          : 'No chats made yet'}
      </div>
    </div>
  );
};

export default Chat;
