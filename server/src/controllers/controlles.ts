import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';

const userModel = new UserModel;
const postModel = new PostModel;

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

    getOwnSpaces(): void {
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

    postPost(): void {
        async (req: Request, res: Response) => {
            try {
                const user = await postModel.createPost(req.body);
                res.status(201);
                res.send(user);
            } catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        };
    }

}