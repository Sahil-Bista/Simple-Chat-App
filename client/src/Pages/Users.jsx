import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Users = () => {
  const [users, SetUsers] = useState([]);
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
      {users.map((user) => (
        <ul>
          <li key={user._id}>{user.firstName}</li>
        </ul>
      ))}
    </div>
  );
};

export default Users;
