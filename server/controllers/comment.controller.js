const {
  createComment,
} = require('../models/prisma.model');

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

module.exports = {
  postComment,
};
