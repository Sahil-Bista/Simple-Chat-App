import { useRef, useEffect } from 'react';

const Messages = ({ messages, myUserId }) => {
  //Attaches a reference to the dom element <div> at the bottom
  const messageEndRef = useRef(null);

  useEffect(() => {
    //scrolls to the bottom div
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full bg-gray-50">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={message._id || index}
            className={`flex w-full ${
              message.senderId?.toString() === myUserId
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                message.senderId?.toString() === myUserId
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 italic">No chats made yet</p>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default Messages;
