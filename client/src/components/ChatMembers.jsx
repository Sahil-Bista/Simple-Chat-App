import { useNavigate } from 'react-router-dom';
import { socket } from '../utils/socket.js';

const ChatMembers = ({ chatMembers, myUserId }) => {
  const navigate = useNavigate();

  return (
    <ul>
      {chatMembers.length > 0
        ? chatMembers.map((member) => (
            <li key={member._id}>
              <button
                onClick={() => {
                  const roomId = [myUserId, member._id].sort().join('');
                  socket.emit(
                    'join-room',
                    roomId,
                    member._id,
                    myUserId,
                    (success) => {
                      if (success) {
                        console.log(`Joined room: ${roomId}`);
                        navigate(`/chat/${member._id}`);
                      } else {
                        console.error('Failed to join room');
                      }
                    }
                  );
                }}
              >
                {member.firstName}
              </button>
            </li>
          ))
        : 'No chats made yet'}
    </ul>
  );
};

export default ChatMembers;
