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
} = require('./controllers/user.controller');

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
 *             type: object
 *             required:
 *               - email
 *               - email_verified
 *               - username
 *               - picture_url
 *               - sub
 *               - created_at
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               email_verified:
 *                 type: boolean
 *               username:
 *                 type: string
 *               picture_url:
 *                 type: string
 *               sub:
 *                 type: string
 *                 description: must be unique
 *               created_at:
 *                 type: string
 *                 format: date-time
 *             example:
 *               email: fake@example.com
 *               email_verified: true
 *               username: myCoolUsername
 *               picture_url: https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png
 *               sub: google-oauth2|123456789
 *               created_at: 2022-04-28T15:12:00.956Z
 *     responses:
 *       "201":
 *         description: Created
 */

router.post('/users', postUser);  // USER

// SPACES
router.post('/spaces', postSpace);  // SPACE

// POSTS
router.post('/posts', postPost);  // POST

// COMMENTS
router.post('/comments', postComment);  // COMMENT

// USER_SPACE_ROLE
router.post('/User_Space_Roles', postUserSpaceRole);  // who knows

// SPACES + CREATORS
router.get('/spacesAndCreators', getSpacesAndCreators);  // SPACE

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
