import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const UserLoginForm = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        data,
        { withCredentials: true }
      );
      const result = response.data;
      console.log(result);
      if (response.status === 200) {
        navigate('/chat');
      }
    } catch (err) {
      console.log(err);
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
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter your password here"
          {...register('password')}
        ></input>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UserLoginForm;
