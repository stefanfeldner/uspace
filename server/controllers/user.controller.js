const {
  createUser,
  createSpace,
  returnAllEntries,
  returnEntryById,
  createPost,
  createComment,
  createUserSpaceRole,
  returnSpacesAndCreators,
  returnSpaceData,
  returnUserBySub,
  deleteSinglePost,
  deleteSingleSpace,
  deleteSingleUserSpaceRole
} = require('../models/prisma.model');

// modular route: returns all entries in a table
const getAllEntries = async (req, res) => {
  try {
    // pass route (table name) and remove '/' in the end
    const entries = await returnAllEntries(req.path.slice(1, -1));
    res.status(200);
    res.send(entries);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// modular route: returns single entry in a table by id
const getSingleEntryById = async (req, res) => {
  try {
    // pass route param, cut off plural and '/' on front and beginning
    const entry = await returnEntryById(req.path, req.params.id);
    res.status(200);
    res.send(entry);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// creates a single user
const postUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// creates a single space
const postSpace = async (req, res) => {
  try {
    const space = await createSpace(req.body);
    res.status(201);
    res.send(space);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// creates a single post
const postPost = async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201);
    res.send(post);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// creates a single comment
const postComment = async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.status(201);
    res.send(comment);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// creates a single User_Space_Role
const postUserSpaceRole = async (req, res) => {
  try {
    const userSpaceRole = await createUserSpaceRole(req.body);
    res.status(201);
    res.send(userSpaceRole);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// return spaces and their creators
const getSpacesAndCreators = async (req, res) => {
  try {
    const spacesAndCreators = await returnSpacesAndCreators();
    res.status(200);
    res.send(spacesAndCreators);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// return a space and it's posts
const getSpaceData = async (req, res) => {
  try {
    const spaceData = await returnSpaceData(req.params.id);
    res.status(200);
    res.send(spaceData);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// get a user by sub
const getUserBySub = async (req, res) => {
  try {
    const user = await returnUserBySub(req.params.sub);
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// delete a single post by id
const deletePost = async (req, res) => {
  try {
    const deletedPost = await deleteSinglePost(req.params.id);
    res.status(202);
    res.send(deletedPost);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// delete a single post by id
const deleteSpace = async (req, res) => {
  try {
    const deletedSpace = await deleteSingleSpace(req.params.id);
    res.status(202);
    res.send(deletedSpace);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// delete single User_Space_role by space_id
const deleteUserSpaceRole = async (req, res) => {
  try {
    const deletedRow = await deleteSingleUserSpaceRole(req.params.spaceId);
    res.status(202);
    res.send(deletedRow);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

module.exports = {
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
  deleteUserSpaceRole
};
