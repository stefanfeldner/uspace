import { PrismaClient } from '@prisma/client';
import { Space } from '../interfaces/space.interface';

const prisma = new PrismaClient();

export class SpaceModel {

  // creates a single space
  async createSpace(req: any) {     // TODO ADD TYPE HERE
      try {
        console.log(req)
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

  async getSpaces(owner: string, page: number) { // TODO ADD TYPE HERE
      try {
        const allSpaces = [];

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

  async deleteSpace(id: string) { // TODO ADD TYPE HERE  
    try {
        const space = await prisma.space.delete({
          where: {
            space_id: +id,
          }
        });
        return space
    } catch (error) {
        return error;
    }
  }
}

