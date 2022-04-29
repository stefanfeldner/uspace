import { createUser, returnUserBySub } from '../models/user.model';
import { Request, Response } from 'express'
// creates a single user
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201);
    res.send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown server error has occurred.' });
    }
  }
};

// get a user by sub
export const getUserBySub = async (req: Request, res:Response): Promise<void> => {
  try {
    const user = await returnUserBySub(req.params.sub);
    if (!user) {
      res.status(404).send({ error: 'User not found.' });
      return;
    }
    res.status(200)
      .send(user);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};
