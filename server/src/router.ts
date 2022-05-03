import Router from 'express';
import { getUser, postUser } from './controllers/user.controllers';
import { getAllSpaces, postSpace, deleteSpace } from './controllers/space.controllers'
import { postPost, deletePost } from './controllers/post.controllers'
import { postComment, deleteComment } from './controllers/comment.controllers'

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
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
 *         description: string user id sub
 *         example: 123asd
 *         schema:
 *           type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserResponse"
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
 *         example: 0
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
 *         name: spaceId
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
 *  /posts/{postId}:
 *   delete:
 *     summary: deletes post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
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
 * tags:
 *   name: Comments
 *   description: Comments management and retrieval
 */

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
 *  /comments/{commentId}:
 *   delete:
 *     summary: creates new comment
 *     description: Takes the post data and creates a new post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
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