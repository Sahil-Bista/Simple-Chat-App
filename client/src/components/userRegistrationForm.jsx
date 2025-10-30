import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../Validation/RegiistrationSchemaValidation.js';

export const UserRegistrationForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //populates formState.errors when osomething fails
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/register',
        data,
        { withCredentials: true }
      );
      const result = response.data;
      console.log(result);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input
          //automatically attached onChange, onBlur, ref
          {...register('firstName')}
          type="text"
          placeholder="Enter your first name here"
        ></input>
        <p>{errors.firstName?.message}</p>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name here"
          {...register('lastName')}
        ></input>
        <p>{errors.lastName?.message}</p>
      </div>
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
      <div>
        <label>Select Role:</label>
        <div>
          <label>
            <input type="radio" value="User" {...register('roles')} />
            User
          </label>
          <p>{errors.roles?.message}</p>
        </div>
        <div>
          <label>
            <input type="radio" value="Admin" {...register('roles')} />
            Admin
          </label>
          <p>{errors.roles?.message}</p>
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
};
