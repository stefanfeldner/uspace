const { createPost, deleteSinglePost } = require('../models/prisma.model');

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

module.exports = { postPost, deletePost };
