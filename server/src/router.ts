import Router from 'express';
import { getUser, postUser, getAllSpaces, postSpace,
        deleteSpace, postPost, deletePost, postComment, 
        deleteComment } from './controllers/controllers';

const router = Router();
  
// USERS
 /**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

 /**
 * @swagger
 *  /users:
 *   post:
 *     summary: creates new user
 *     description: Takes the user data and creates a new user.
 *     tags: [Users]
 *     c
 *     responses:
 *       "201":
 *         description: Created
 */

 router.post('/users', postUser);


 /**
 * @swagger
 *  /users/{id}:
 *   get:
 *     summary: get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: numeric user id
 *         schema:
 *           type: string
 *     responses:
 *       "201":
 *         description: Created
 */
 router.get('/users/:id', getUser);



 // SPACES
 /**
 * @swagger
 * tags:
 *   name: Spaces
 *   description: Spaces management and retrieval
 */

 /**
 * @swagger
 *  /spaces/{owner}/{page}:
 *   get:
 *     summary: get required number of spaces based on the selected page
 *     description: Takes 20 of own spaces, 20 of other spaces and returns all populated data (posts, comments)
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         description: string user sub
 *         schema:
 *           type: string
 *       - in: path
 *         name: page
 *         required: true
 *         description: number of selected page first page 0
 *         schema:
 *           type: integer
 *     responses:
 *       "201":
 *         description: Created
 */
router.get('/spaces/:page', getAllSpaces);

 /**
 * @swagger
 *  /spaces:
 *   post:
 *     summary: creates new space
 *     description: Takes the space data and creates a new space.
 *     tags: [Spaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Space"
 *     responses:
 *       "201":
 *         description: Created
 */
router.post('/spaces', postSpace);

 /**
 * @swagger
 *  /spaces/{spaceId}:
 *   delete:
 *     summary: deletes space by id
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: numeric space id
 *         schema:
 *           type: integer
 *     responses:
 *       "201":
 *         description: Created
 */
router.delete('/spaces/:id', deleteSpace);

// POSTS
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management and retrieval
 */

 /**
 * @swagger
 *  /posts:
 *   post:
 *     summary: creates new post
 *     description: Takes the post data and creates a new post.
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       "201":
 *         description: Created
 */
router.post('/posts', postPost);

 /**
 * @swagger
 *  /posts/{postsId}:
 *   delete:
 *     summary: deletes post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: numeric post id
 *         schema:
 *           type: integer
 *     responses:
 *       "201":
 *         description: Created
 */
router.delete('/posts/:id', deletePost);

 /**
 * @swagger
 *  /comments:
 *   post:
 *     summary: creates new comment
 *     description: Takes the post data and creates a new post.
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comment"
 *     responses:
 *       "201":
 *         description: Created
 */
router.post('/comments', postComment);

 /**
 * @swagger
 *  /comments:
 *   delete:
 *     summary: creates new comment
 *     description: Takes the post data and creates a new post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: numeric comment id
 *         schema:
 *           type: integer
 *     responses:
 *       "201":
 *         description: Created
 */
router.delete('/comments/:id', deleteComment);

export default router;