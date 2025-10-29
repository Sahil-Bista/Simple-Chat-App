import express from 'express';
import { getChatHistoryValidation } from '../../validation/messagesValidation.js';
import { validationResultHandler } from '../../middlewares/validationMiddleware.js';
import {
  getChatMembers,
  receiveUserChatMessages,
} from '../../controllers/chatController.js';
import { verifyJWT } from '../../middlewares/verifyJWT.js';
import { verifyRoles } from '../../middlewares/verifyRoles.js';

export const chatRouter = express.Router();

chatRouter.get(
  '/:userId',
  verifyJWT,
  verifyRoles('User', 'Admin'),
  getChatHistoryValidation,
  validationResultHandler,
  receiveUserChatMessages
);

chatRouter.get('/', verifyJWT, verifyRoles('User', 'Admin'), getChatMembers);
