import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';
import { SpaceModel } from '../models/space.model';
import { CommentModel } from '../models/comment.model';

const userModel = new UserModel;
const postModel = new PostModel;
const spaceModel = new SpaceModel;
const commentModel = new CommentModel;

export class BaseController {

    // creates a single user
    postUser(): void {
        async (req: Request, res: Response) => {
            try {
                const user = await userModel.createUser(req.body);
                res.status(201);
                res.send(user);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

    // find user by sub
    getUser(): void {
        async (req: Request, res: Response) => {
            try {
                const deletedUser = await userModel.getUser(req.params.id);
                res.status(201);
                res.send(deletedUser);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

    // create a space
    postSpace(): void {
        async (req: Request, res: Response) => {
            try {
                const space = await spaceModel.createSpace(req.body);
                res.status(201);
                res.send(space);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

    // get 20 own spaces and 20 other spaces 
    getAllSpaces(): void {
        async (req: Request, res: Response) => {
            try {
                const allSpaces = await spaceModel.getSpaces(req.params.page);
                res.status(201);
                res.send(allSpaces);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

     // delete a space
     deleteSpace(): void {
        async (req: Request, res: Response) => {
            try {
                const deletedSpace = await spaceModel.deleteSpace(req.params.id);
                res.status(201);
                res.send(deletedSpace);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

    // post a post
    postPost(): void {
        async (req: Request, res: Response) => {
            try {
                const post = await postModel.createPost(req.body);
                res.status(201);
                res.send(post);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

      // delete post by id
      deletePost(): void {
        async (req: Request, res: Response) => {
            try {
                const deletedPost = await postModel.deletePost(req.params.id);
                res.status(201);
                res.send(deletedPost);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

    // post a comment 
    postComment(): void {
        async (req: Request, res: Response) => {
            try {
                const comment = await commentModel.createComment(req.body);
                res.status(201);
                res.send(comment);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };  
    }

    // delete comment by id
    deleteComment(): void {
        async (req: Request, res: Response) => {
            try {
                const deletedComment = await commentModel.deleteComment(req.params.id);
                res.status(201);
                res.send(deletedComment);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };  
    }

}