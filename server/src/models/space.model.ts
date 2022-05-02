import { PrismaClient } from '@prisma/client';
import { Space } from '../interfaces/space.interface';

const prisma = new PrismaClient();

export class SpaceModel {

  // creates a single space
  async createSpace(req: Space) {     // TODO ADD TYPE HERE
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
  };

  async getSpaces(req: any) { // TODO ADD TYPE HERE
      try {
        const allSpaces = [];

        const { owner, page } = req;

        let next = (page * 20);

        // first - 20 own spaces
        const first = await prisma.space.findMany({
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

        const second = await prisma.space.findMany({
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

  async deleteSpace(req: any) { // TODO ADD TYPE HERE  
    try {
        const { space_id } = req;
        const space = await prisma.space.delete({
          where: {
            space_id: space_id,
          }
        });
    } catch (error) {
        return error;
    }
  }
}

