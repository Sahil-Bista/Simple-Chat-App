import * as yup from 'yup';

export const LoginValidation = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('FirstName is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 charcters long')
    .required('Password is required'),
});
