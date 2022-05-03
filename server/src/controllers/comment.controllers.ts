import { Request, RequestHandler, Response } from 'express';
import { CommentModel } from '../models/comment.model';

const commentModel = new CommentModel;

// post a comment 
export const postComment: RequestHandler = async (req: Request, res: Response) => {
    try {
        const comment = await commentModel.createComment(req.body);
        res.status(201);
        res.send(comment);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }  
}

// delete comment by id
export const deleteComment: RequestHandler = async (req: Request, res: Response) => {
    try {
        const deletedComment = await commentModel.deleteComment(req.params.id);
        res.status(201);
        res.send(deletedComment);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
}

