import * as yup from 'yup';

export const registrationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'password must be at least 6 characters long')
    .required('Password is required'),
  firstName: yup.string().trim().required('FirstName is required'),
  lastName: yup.string().trim().required('Last name is required'),
  roles: yup.string().oneOf(['User', 'Admin'], 'Invalid role').notRequired(),
});
