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
  returnUserBySub
} = require('../models/prisma.model');

// modular route: returns all entries in a table
const getAllEntries = async (req, res) => {
  try {
    // pass route (table name) and remove '/' in the end
    const entries = await returnAllEntries(req.path.slice(1, -1));
    res.send(entries);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// modular route: returns single entry in a table by id
const getSingleEntryById = async (req, res) => {
  try {
    // pass route param, cut off plural and '/' on front and beginning
    const entry = await returnEntryById(req.path, req.params.id);
    res.send(entry);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// creates a single user
const postUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
    res.status(201);
  } catch (error) {
    res.send(error);
    res.status(500);
  }
};

// creates a single space
const postSpace = async (req, res) => {
  try {
    const space = await createSpace(req.body);
    res.send(space);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// creates a single post
const postPost = async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.send(post);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// creates a single comment
const postComment = async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.send(comment);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// creates a single User_Space_Role
const postUserSpaceRole = async (req, res) => {
  try {
    const userSpaceRole = await createUserSpaceRole(req.body);
    res.send(userSpaceRole);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// return spaces and their creators
const getSpacesAndCreators = async (req, res) => {
  try {
    const spacesAndCreators = await returnSpacesAndCreators();
    res.send(spacesAndCreators);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// return a space and it's posts
const getSpaceData = async (req, res) => {
  try {
    const spaceData = await returnSpaceData(req.params.id);
    res.send(spaceData);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
  }
};

// get a user by sub
const getUserBySub = async (req, res) => {
  try {
    const user = await returnUserBySub(req.params.sub);
    res.send(user);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(404);
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
  getUserBySub
};
