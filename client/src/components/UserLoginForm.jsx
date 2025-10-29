import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        navigate('/chat');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter your password here"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UserLoginForm;
