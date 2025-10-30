import { useForm } from 'react-hook-form';
import { socket } from '../utils/socket';

const ChatForm = ({ receiverId, senderId, messageHandler }) => {
  const { handleSubmit, register } = useForm();

  const roomId = [receiverId, senderId].sort().join('');

  const onSubmit = (data) => {
    const message = data.message;
    socket.emit('sendMessage', senderId, receiverId, message, roomId);
    messageHandler({
      senderId: senderId,
      receiverId: receiverId,
      message,
      createdAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Enter your message here</label>
        <input
          type="text"
          placeholder="enter your message here"
          {...register('message')}
        ></input>
        <button>Send</button>
      </div>
    </form>
  );
};

export default ChatForm;
