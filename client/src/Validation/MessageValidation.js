import * as yup from 'yup';

export const messageValidation = yup.object({
  message: yup
    .string()
    .trim()
    .required('Please type something before sending in'),
});
