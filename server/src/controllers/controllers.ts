import { Request, RequestHandler, Response } from 'express';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';
import { SpaceModel } from '../models/space.model';
import { CommentModel } from '../models/comment.model';

const userModel = new UserModel;
const postModel = new PostModel;
const spaceModel = new SpaceModel;
const commentModel = new CommentModel;

// creates a single user
export const postUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = await userModel.createUser(req.body);
        res.status(201);
        res.send(user);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};

// find user by sub
export const getUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const findUser = await userModel.getUser(req.params.id);
        res.status(201);
        res.send(findUser);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};

// create a space
export const postSpace: RequestHandler = async (req: Request, res: Response) => {
    try {
        const space = await spaceModel.createSpace(req.body);
        res.status(201);
        res.send(space);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};

// get 20 own spaces and 20 other spaces 
export const getAllSpaces: RequestHandler = async (req: Request, res: Response) => {
    try {
        const owner = req.params.owner;
        const page = +req.params.page
        const allSpaces = await spaceModel.getSpaces(owner, page);
        res.status(201);
        res.send(allSpaces);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }  
};

// delete a space
export const deleteSpace: RequestHandler = async (req: Request, res: Response) => {
    try {
        const deletedSpace = await spaceModel.deleteSpace(req.params.id);
        res.status(201);
        res.send(deletedSpace);
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};

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

