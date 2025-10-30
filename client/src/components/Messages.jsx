const Messages = ({ messages }) => {
  return (
    <div style={{ overflowY: 'scroll', flex: 1 }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <li key={message._id || index}>
            <p>{message.message}</p>
          </li>
        ))
      ) : (
        <p>No chats made yet</p>
      )}
    </div>
  );
};

export default Messages;
