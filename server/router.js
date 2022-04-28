const router = require('express').Router();
const { postUser, getUserBySub } = require('./controllers/user.controller');
const {
  postUserSpaceRole,
  getSpacesAndCreators,
  deleteUserSpaceRole,
} = require('./controllers/user-space-role.controller');
const { postPost, deletePost } = require('./controllers/post.controller');
const { postComment } = require('./controllers/comment.controller');
const { postSpace, getSpaceData, deleteSpace } = require('./controllers/space.controller');
const { getAllEntries, getSingleEntryById } = require('./controllers/modular-routes.controller');

//
// '/:table' routes are dynamic and return all entries of a given table
//

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

// SPACES + CREATORS
router.get('/spacesAndCreators', getSpacesAndCreators);

// SPACE + POSTS
router.get('/spaceData/:id', getSpaceData);

// GET USER BY SUB
router.get('/usersBySub/:sub', getUserBySub);

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
