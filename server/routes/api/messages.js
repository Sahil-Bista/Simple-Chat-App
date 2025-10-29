import express from 'express';
import { getChatHistoryValidation } from '../../validation/messagesValidation.js';
import { validationResultHandler } from '../../middlewares/validationMiddleware.js';
import {
  getChatMembers,
  receiveUserChatMessages,
} from '../../controllers/chatController';

export const chatRouter = express.Router();

chatRouter.get(
  '/:userId',
  getChatHistoryValidation,
  validationResultHandler,
  receiveUserChatMessages
);

chatRouter.get('/', getChatMembers);
