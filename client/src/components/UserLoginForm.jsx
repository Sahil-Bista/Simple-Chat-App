import { useNavigate } from 'react-router-dom';
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
        navigate('/chat');
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email here"
          {...register('email')}
        ></input>
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter your password here"
          {...register('password')}
        ></input>
        <p>{errors.password?.message}</p>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UserLoginForm;
