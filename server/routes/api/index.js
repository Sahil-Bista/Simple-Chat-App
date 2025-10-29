import express from 'express';
import { UserRouter } from './user.js';
import { chatRouter } from './messages.js';

export const Router = express.Router();

Router.get('/health', (req, res) => {
  console.log('Route working');
  res.send('OK');
});

Router.use('/user', UserRouter);
Router.use('/chat', chatRouter);
