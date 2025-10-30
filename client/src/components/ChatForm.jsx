import { useForm } from 'react-hook-form';
import { socket } from '../utils/socket';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageValidation } from '../Validation/MessageValidation.js';

const ChatForm = ({ receiverId, senderId, messageHandler }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(messageValidation) });

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
    reset();
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
        <p>{errors.message?.message}</p>
        <button>Send</button>
      </div>
    </form>
  );
};

export default ChatForm;
