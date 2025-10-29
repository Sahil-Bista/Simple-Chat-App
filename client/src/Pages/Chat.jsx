import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);

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
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {chatMembers.map((members) => {
          <ul>
            <li>{members}</li>
          </ul>;
        })}
      </div>
      <div>No messages yet!</div>
    </div>
  );
};

export default Chat;
