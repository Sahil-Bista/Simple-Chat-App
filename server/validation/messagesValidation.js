import { param } from 'express-validator';

export const getChatHistoryValidation = [
  param('userId').isMongoId().withMessage('It must be a valid mongoId object'),
];
