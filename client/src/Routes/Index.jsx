import { createBrowserRouter } from 'react-router-dom';
import Signup from '../Pages/Signup.jsx';
import Login from '../Pages/Login.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Signup /> },
  { path: '/login', element: <Login /> },
]);
