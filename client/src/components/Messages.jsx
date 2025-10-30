const Messages = ({ messages }) => {
  return (
    <>
      {messages.length > 0
        ? messages.map((message) => (
            <ul key={message._id}>
              <li>{message.message}</li>
            </ul>
          ))
        : 'No chats made yet'}
    </>
  );
};

export default Messages;
