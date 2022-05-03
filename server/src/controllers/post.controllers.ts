import { Request, RequestHandler, Response } from 'express';
import { PostModel } from '../models/post.model';

const postModel = new PostModel;

// post a post
export const postPost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const post = await postModel.createPost(req.body);
        res.status(201);
        res.send(post);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};

// delete post by id
export const deletePost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const deletedPost = await postModel.deletePost(req.params.id);
        res.status(201);
        res.send(deletedPost);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
}
