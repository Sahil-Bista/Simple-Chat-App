import { useNavigate } from 'react-router-dom';

const ChatMembers = ({ chatMembers }) => {
  const navigate = useNavigate();

  return (
    <>
      {chatMembers.length > 0
        ? chatMembers.map((member) => (
            <ul key={member._id}>
              <button onClick={() => navigate(`/chat/${member._id}`)}>
                {member.firstName}
              </button>
            </ul>
          ))
        : 'No chats made yet'}
    </>
  );
};

export default ChatMembers;
