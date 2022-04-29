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
