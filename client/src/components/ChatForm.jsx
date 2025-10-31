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
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type a message..."
          {...register('message')}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      {errors.message?.message && (
        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
      )}
    </form>
  );
};

export default ChatForm;
