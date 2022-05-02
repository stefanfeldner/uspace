import Router from 'express';
import { getUser, postUser, getAllSpaces, postSpace,
        deleteSpace, postPost, deletePost, postComment, 
        deleteComment } from './controllers/controllers';

const router = Router();
  
// USERS
router.get('/users/:id', getUser);
router.post('/users', postUser);

// SPACES
router.get('/spaces/:page', getAllSpaces);
router.post('/spaces', postSpace);
router.delete('/spaces/:id', deleteSpace);

// POSTS
router.post('/posts', postPost);
router.delete('/posts/:id', deletePost);

// COMMENTS
router.post('/comments', postComment);
router.delete('/comments/:id', deleteComment);

export default router;