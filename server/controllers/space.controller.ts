import { Request, Response } from 'express';
import { createSpace, returnSpaceData, deleteSingleSpace } from '../models/space.model';

// creates a single space
export const postSpace = async (req: Request, res: Response): Promise<void> => {
  try {
    const space = await createSpace(req.body);
    res.status(201).send(space);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};

// return a space and it's posts
export const getSpaceData = async (req:Request, res: Response): Promise<void> => {
  try {
    const spaceData = await returnSpaceData(req.params.id);
    if (!spaceData) {
      res.status(404).send({ error: 'Space has not been found.' });
      return;
    }
    res.status(200).send(spaceData);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};

// delete a single post by id
export const deleteSpace = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSpace = await deleteSingleSpace(req.params.id);
    res.status(202).send(deletedSpace);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};