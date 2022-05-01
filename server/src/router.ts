import express from 'express';
import { BaseController } from './controllers/controllers';

const controller = new BaseController();
const router = express.Router();
  
// USERS
router.get('/users/:id', controller.getUser);
router.post('/users', controller.postUser);

// SPACES
router.get('/spaces/:page', controller.getAllSpaces);
router.post('/spaces', controller.postSpace);
router.delete('/spaces/:id', controller.deleteSpace);

// POSTS
router.post('/posts', controller.postPost);
router.delete('/posts/:id', controller.deletePost);

// COMMENTS
router.post('/comments', controller.postComment);
router.delete('/comments/:id', controller.deleteComment);

export default router;