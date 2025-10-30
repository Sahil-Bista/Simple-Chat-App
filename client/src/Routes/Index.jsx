import { createBrowserRouter } from 'react-router-dom';
import Signup from '../Pages/Signup.jsx';
import Login from '../Pages/Login.jsx';
import Users from '../Pages/Users.jsx';
import Chat from '../Pages/Chat.jsx';

export const router = createBrowserRouter([
  { path: '/register', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/', element: <Users /> },
  { path: '/chat/:userId', element: <Chat /> },
]);
