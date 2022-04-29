// @ts-ignore
import { createPost, deleteSinglePost } from '../models/prisma.model';
import { Request, Response } from 'express';

// creates a single post
const postPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await createPost(req.body);
    res.status(201);
    res.send(post);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// delete a single post by id
const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await deleteSinglePost(req.params.id);
    res.status(202);
    res.send(deletedPost);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

module.exports = { postPost, deletePost };
