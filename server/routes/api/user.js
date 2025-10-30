import express from 'express';
import { registerUser } from '../../controllers/registerController.js';
import {
  loginValidator,
  registerValidator,
} from '../../validation/userValidation.js';
import { validationResultHandler } from '../../middlewares/validationMiddleware.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';
import { loginUser } from '../../controllers/authController.js';
import { logout } from '../../controllers/logoutController.js';
import { getUsers } from '../../controllers/userController.js';
import { verifyJWT } from '../../middlewares/verifyJWT.js';
import { verifyRoles } from '../../middlewares/verifyRoles.js';

export const UserRouter = express.Router();

UserRouter.post(
  '/register',
  registerValidator,
  validationResultHandler,
  asyncWrapper(registerUser)
);

UserRouter.post(
  '/login',
  loginValidator,
  validationResultHandler,
  asyncWrapper(loginUser)
);

UserRouter.get(
  '/',
  verifyJWT,
  verifyRoles('User', 'Admin'),
  asyncWrapper(getUsers)
);

UserRouter.post('/logout', logout);
