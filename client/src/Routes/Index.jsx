import { createBrowserRouter } from 'react-router-dom';
import Signup from '../Pages/Signup.jsx';
import Login from '../Pages/Login.jsx';
import Users from '../Pages/Users.jsx';
import Chat from '../Pages/Chat.jsx';
import NotFound from '../components/NotFound.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/users', element: <Users /> },
  { path: '/chat/:userId', element: <Chat /> },
  { path: '/chat/', element: <Chat /> },
  { path: '*', element: <NotFound /> },
]);
