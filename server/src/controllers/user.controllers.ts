import { Request, RequestHandler, Response } from 'express';
import { UserModel } from '../models/user.model';

const userModel = new UserModel;

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

        if (findUser) {
            res.status(201);
            res.send(findUser);
        } else {
            res.status(404)
            res.send({message: 'Not Found'})
        }
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error));
    }
};
