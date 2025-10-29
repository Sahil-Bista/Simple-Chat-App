import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/register',
        {
          email,
          password,
          firstName,
          lastName,
          roles: role,
        },
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter your first name here"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name here"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
      </div>
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
      <div>
        <label>Select Role:</label>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="User"
              checked={role === 'User'}
              onChange={(e) => setRole(e.target.value)}
            />
            User
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={role === 'Admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UserRegistrationForm;
