import express from 'express';
import { registerUser } from '../../controllers/registerController.js';
import { registerValidator } from '../../validation/userValidation.js';
import { validationResultHandler } from '../../middlewares/validationMiddleware.js';

export const UserRouter = express.Router();

UserRouter.post(
  '/register',
  registerValidator,
  validationResultHandler,
  registerUser
);
