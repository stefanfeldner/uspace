import { Request, Response } from 'express';
// @ts-ignore
import { createSpace, returnSpaceData, deleteSingleSpace } from '../models/prisma.model';

// creates a single space
const postSpace = async (req: Request, res:Response): Promise<void> => {
  try {
    const space = await createSpace(req.body);
    res.status(201);
    res.send(space);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// return a space and it's posts
const getSpaceData = async (req:Request, res: Response): Promise<void> => {
  try {
    const spaceData = await returnSpaceData(req.params.id);
    res.status(200);
    res.send(spaceData);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// delete a single post by id
const deleteSpace = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSpace = await deleteSingleSpace(req.params.id);
    res.status(202);
    res.send(deletedSpace);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

module.exports = { postSpace, getSpaceData, deleteSpace };
