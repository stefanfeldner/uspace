const { createUserSpaceRole, returnSpacesAndCreators, deleteSingleUserSpaceRole } = require('../models/prisma.model');

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

module.exports = { postUserSpaceRole, getSpacesAndCreators, deleteUserSpaceRole };
