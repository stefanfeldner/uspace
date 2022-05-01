import { PrismaClient } from '@prisma/client';
import { Space } from '../interfaces/space.interface';

const prisma = new PrismaClient();

export class SpaceModel {

  // creates a single space
  createSpace(req: Space): any {     // TODO ADD TYPE HERE
    return async () => {
      try {
        const { name, owner, description } = req;
      
        const space = await prisma.space.create({
          data: {
            name: name,
            description: description,
            owner: owner,
          },
        });
        return space;
      } catch (error) {
          return error;
        }
      } 
  };

  getSpaces(req: any): any { // TODO ADD TYPE HERE
    return async () => {
      try {
        const allSpaces = [];

        const { owner, page } = req;

        let next = (page * 20);

        // first - 20 own spaces
        const first = prisma.space.findMany({
          skip: next,
          take: 20,
          where: {
            owner: owner,
          },
          orderBy: {
              created_at: 'desc',
          },
          include: {
            post: true,
            space_colab: true,
          },
        });

        const second = prisma.space.findMany({
          skip: next,
          take: 20,
          where: {
            owner: {
              not: owner,
            }
          },
          orderBy: {
              created_at: 'desc',
          },
          include: {
            post: true,
            space_colab: true,
          }
        });

        allSpaces.push(first);
        allSpaces.push(second);

        return allSpaces;
      } catch (error) {
        return error;
      }
    }
  }

  deleteSpace(req: any): any { // TODO ADD TYPE HERE
    return async () => {

      const { space_id } = req;
      
      try {
        const space = prisma.space.delete({
          where: {
            space_id: space_id,
          }
        });
      } catch (error) {
        return error;
      }
    }
  }
}

