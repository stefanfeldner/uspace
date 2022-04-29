import { createPost, deleteSinglePost } from '../models/post.model';
import { Request, Response } from 'express';

// creates a single post
export const postPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await createPost(req.body);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};

// delete a single post by id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await deleteSinglePost(req.params.id);
    res.status(202).send(deletedPost);
  } catch (error) {
    res.status(500).send({ error: 'An unknown server error has occurred.' });
  }
};
