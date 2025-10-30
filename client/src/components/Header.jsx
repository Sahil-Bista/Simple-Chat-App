import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://locahost:3001/api/user/logout');
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message, { autoClose: 5000 });
      } else {
        toast.error('An unexpected error occurred.PLease try again');
      }
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Link to="/">Users</Link>
      <button onSubmit={handleSubmit}>Logout</button>
    </div>
  );
};

export default Header;
