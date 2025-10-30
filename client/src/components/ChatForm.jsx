import { useForm } from 'react-hook-form';
import { socket } from '../utils/socket';

const ChatForm = ({ receiverId, senderId }) => {
  const { handleSubmit, register } = useForm();

  const roomId = [receiverId, senderId].sort().join('');

  const onSubmit = (data) => {
    const message = data.message;
    socket.emit('sendMessage', senderId, receiverId, message, roomId);
    console.log(data);
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
      </div>
    </form>
  );
};

export default ChatForm;
