import { Request, RequestHandler, Response } from 'express';
import { SpaceModel } from '../models/space.model';

const spaceModel = new SpaceModel;


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
