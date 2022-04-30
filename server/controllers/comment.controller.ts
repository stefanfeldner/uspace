import { createComment } from '../models/comment.model';
import { Request, Response } from 'express';

// creates a single comment
export const postComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await createComment(req.body);
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};
