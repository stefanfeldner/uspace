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

router.post('/users', postUser);  // USER

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
router.post('/spaces', postSpace);  // SPACE

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
router.post('/posts', postPost);  // POST

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
 *     summary: creates new post
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
router.post('/comments', postComment);  // COMMENT

// USER_SPACE_ROLE
router.post('/User_Space_Roles', postUserSpaceRole);  // SPACE_COLAB
router.get('/spacesAndCreators', getSpacesAndCreators);  // SPACE_COLAB

// SPACE + POSTS
router.get('/spaceData/:id', getSpaceData);  // SPACE

// GET USER BY SUB
router.get('/usersBySub/:sub', getUserBySub); // USER

// MODULAR ROUTES
router.get('/:table', getAllEntries);
router.get('/:table/:id', getSingleEntryById);

// DELETE POST
router.delete('/posts/:id', deletePost);

// DELETE SPACE
router.delete('/spaces/:id', deleteSpace);

// DELETE SPACE BY SPACE ID
router.delete('/User_Space_Roles/:spaceId', deleteUserSpaceRole);

module.exports = router;
