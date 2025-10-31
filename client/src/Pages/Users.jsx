import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket.js';
import Header from '../components/Header.jsx';

export const Users = () => {
  const [users, SetUsers] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const token = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setMyUserId(decoded.UserInfo.user);
      } catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        toast.error('Invalid token. Please login again.', { autoClose: 5000 });
        navigate('/login');
      }
    } else {
      toast.info('You must be logged in to access users list.', {
        autoClose: 5000,
      });
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          'http://localhost:3000/api/user',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          //takes cookies together
          { withCredentials: true }
        );
        const data = response.data.data;
        SetUsers(data);
      } catch (err) {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message, { autoClose: 5000 });
        } else {
          toast.error('An unexpected error occurred.PLease try again');
        }
      }
    };
    if (token) getUsers();
  }, [token]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex-1 overflow-y-auto p-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No users available.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user._id}>
                <button
                  onClick={() => {
                    socket.emit(
                      'join-room',
                      [myUserId, user._id].sort().join(''),
                      user._id,
                      myUserId,
                      (success) => {
                        if (success) {
                          console.log(
                            `Joined room from users: ${[myUserId, user._id]
                              .sort()
                              .join('')}`
                          );
                          navigate(`/chat/${user._id}`);
                        } else {
                          toast.error('Failed to join room');
                        }
                      }
                    );
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors bg-white shadow-sm"
                >
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.firstName.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800 truncate">
                    {user.firstName} {user.lastName || ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Users;
