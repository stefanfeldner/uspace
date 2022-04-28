const { returnAllEntries, returnEntryById } = require('../models/prisma.model');

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
module.exports = { getAllEntries, getSingleEntryById };
