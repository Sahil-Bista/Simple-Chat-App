import express from 'express';

export const Router = express.Router();

Router.get('/health', (req, res) => {
  console.log('Route working');
  res.send('OK');
});
