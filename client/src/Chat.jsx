import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);

  useEffect(() => {
    try {
      const response = axios.post(
        'http://locahost:3000/api/chat',
        {},
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
      setChatMembers(data);
    } catch (err) {
      console.log(err);
    }
  }, [chatMembers]);
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
