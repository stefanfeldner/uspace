const router = require('express').Router();
const {
  postUser,
  postSpace,
  getAllEntries,
  getSingleEntryById,
  postPost,
  postComment,
  postUserSpaceRole,
  getSpacesAndCreators,
  getSpaceData,
  getUserBySub,
  deletePost,
  deleteSpace,
  deleteUserSpaceRole,
} = require('../controllers/user.controller');

//
// '/:table' routes are dynamic and return all entries of a given table
//

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
 *         description: numeric user id
 *         example: 123asd
 *         schema:
 *           type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: user created
 */
router.get('/users/:id', () => console.log('get user by id'))


// SPACES
/**
 * @swagger
 * tags:
 *   name: Spaces
 *   description: Spaces management and retrieval
 */

/**
 * @swagger
 *  /spaces:
 *   get:
 *     summary: get required number of spaces
 *     description: Takes 20 of own spaces, 20 of other spaces and returns all populated data (posts, comments)
 *     tags: [Spaces]
 *     responses:
 *       "201":
 *         description: Created
 */
router.post('/spaces', () => console.log('get all spaces'));

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

// COMMENTS
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
// todo implement delete
router.delete('/comments/:id', () => console.log('delete comment'));


// USER_SPACE_ROLE
router.post('/User_Space_Roles', postUserSpaceRole);  // SPACE_COLAB
router.get('/spacesAndCreators', getSpacesAndCreators);  // SPACE_COLAB
router.delete('/User_Space_Roles/:spaceId', deleteUserSpaceRole);

// SPACE + POSTS
//todo will not be needed
router.get('/spaceData/:id', getSpaceData);  // SPACE

// GET USER BY SUB
//todo will not be needed
router.get('/usersBySub/:sub', getUserBySub); // USER

// MODULAR ROUTES
//todo will not be needed
// router.get('/:table', getAllEntries);
// router.get('/:table/:id', getSingleEntryById);

module.exports = router;
