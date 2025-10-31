import { useNavigate } from 'react-router-dom';
import { socket } from '../utils/socket.js';

const ChatMembers = ({ chatMembers, myUserId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 bg-gray-100 h-screen border-r border-gray-300 flex flex-col">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
        Chats
      </h2>
      <ul className="flex-1 overflow-y-auto">
        {chatMembers.length > 0 ? (
          chatMembers.map((member) => {
            const roomId = [myUserId, member._id].sort().join('');

            return (
              <li key={member._id}>
                <button
                  onClick={() => {
                    socket.emit(
                      'join-room',
                      roomId,
                      member._id,
                      myUserId,
                      (success) => {
                        if (success) {
                          navigate(`/chat/${member._id}`);
                        } else {
                          console.error('Failed to join room');
                        }
                      }
                    );
                  }}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg mb-1 focus:outline-none hover:bg-gray-200 bg-transparent text-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold">
                    {member.firstName.charAt(0)}
                  </div>
                  <span className="truncate">{member.firstName}</span>
                </button>
              </li>
            );
          })
        ) : (
          <p className="text-gray-500 p-4">No chats made yet</p>
        )}
      </ul>
    </div>
  );
};

export default ChatMembers;
