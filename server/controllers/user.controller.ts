// @ts-ignore
import { createUser, returnUserBySub } from '../models/prisma.model';
import { Request, Response } from 'express'
// creates a single user
const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// get a user by sub
const getUserBySub = async (req: Request, res:Response): Promise<void> => {
  try {
    const user = await returnUserBySub(req.params.sub);
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

module.exports = {
  postUser,
  getUserBySub
};
