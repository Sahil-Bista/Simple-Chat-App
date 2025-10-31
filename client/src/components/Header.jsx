import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/logout'
      );
      console.log(response, 'hi');
      if (response.status === 204) {
        navigate('/login');
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
    <header className="flex items-center justify-between bg-white border-b border-gray-300 px-6 h-16 shadow-sm">
      <div className="text-2xl font-bold text-blue-500">
        <Link to="/users">Chat App</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/users"
          className="text-gray-800 font-semibold hover:text-blue-500 transition-colors"
        >
          Users
        </Link>
        <Link
          to="/chat"
          className="text-gray-800 font-semibold hover:text-blue-500 transition-colors"
        >
          Chats
        </Link>
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
