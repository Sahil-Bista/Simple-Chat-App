import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chatMembers, setChatMembers] = useState([]);
  // const [messages, setMessages] = useState([]);

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
        console.log(response.data.data);
        setChatMembers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, []);

  // useEffect(() => {
  //   const messageHandler = (message) => {
  //     setMessages((prev) => [...prev, message]);
  //   };

  //   socket.on('message', messageHandler);

  //   return () => {
  //     socket.off('message', messageHandler);
  //   };
  // }, []);

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
      {/* <div>
        {messages.length > 0
          ? messages.map((msg, i) => <p key={i}>{msg.message}</p>)
          : 'No messages yet'}
      </div> */}
    </div>
  );
};

export default Chat;
