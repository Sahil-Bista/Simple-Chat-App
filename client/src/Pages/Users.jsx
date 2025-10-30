import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket.js';

export const Users = () => {
  const [users, SetUsers] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const token = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setMyUserId(decoded.UserInfo.user);
    }
  }, [token]);

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
    getUsers();
  }, []);

  return (
    <div>
      <ul>
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
                      navigate(`/chat/${user._id}`);
                    }
                  }
                );
              }}
            >
              {user.firstName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
