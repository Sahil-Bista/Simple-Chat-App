import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidation } from '../Validation/LoginValidationSchema.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        data,
        { withCredentials: true }
      );

      const result = response.data;
      if (response.status === 200) {
        localStorage.setItem('accessToken', result.accessToken);
        navigate('/users');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            {...register('email')}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Haven't registered yet?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLoginForm;
