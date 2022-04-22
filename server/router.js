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
  getUserBySub
} = require('./controllers/user.controller');

// '/:table' routes are dynamic and return all entries of a given table

// SPACES + CREATORS
router.get('/spacesAndCreators', getSpacesAndCreators);

// SPACE + POSTS
router.get('/spaceData/:id', getSpaceData);

// USERS
router.post('/users', postUser);

// SPACES
router.post('/spaces', postSpace);

// POSTS
router.post('/posts', postPost);

// COMMENTS
router.post('/comments', postComment);

// USER_SPACE_ROLE
router.post('/User_Space_Roles', postUserSpaceRole);

// GET USER BY SUB
router.get('/usersBySub/:sub', getUserBySub)

// MODULAR ROUTES
router.get('/:table', getAllEntries);
router.get('/:table/:id', getSingleEntryById);

module.exports = router;
