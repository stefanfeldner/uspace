import { createUserSpaceRole, returnSpacesAndCreators, deleteSingleUserSpaceRole } from '../models/user-space-role.model';
import { Request, Response } from 'express';
// creates a single User_Space_Role
export const postUserSpaceRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const userSpaceRole = await createUserSpaceRole(req.body);
    res.status(201).send(userSpaceRole);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown server error has occurred.' });
    }
  }
};

// return spaces and their creators
export const getSpacesAndCreators = async (req: Request, res: Response): Promise<void> => {
  try {
    const spacesAndCreators = await returnSpacesAndCreators();
    res.status(200).send(spacesAndCreators);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown server error has occurred.' });
    }
  }
};

// delete single User_Space_role by space_id
export const deleteUserSpaceRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRow = await deleteSingleUserSpaceRole(req.params.spaceId);
    res.status(202).send(deletedRow);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown server error has occurred.' });
    }
  }
};
