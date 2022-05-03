import { PrismaClient } from '@prisma/client';
import { ErrorResponse } from '../interfaces/error.interface';
import { Space } from '../interfaces/space.interface';

const prisma = new PrismaClient();

export class SpaceModel {

  async createSpace(req: Space) {  
      try {
        const { name, owner, description } = req;
      
        return await prisma.space.create({
          data: {
            name: name,
            description: description,
            owner: owner,
          },
        });
      } catch (error) {
        console.error(error)
        return {
          error: 'Could not create Space'
        }
      }
  };

  async getSpaces(owner: string, page: number) { 
      try {
        const allSpaces = [];

        let next = (page * 20);

        // first - 20 own most recent spaces 
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

        // second - 20 other most recent spaces
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
        console.error(error)
        return {
          error: 'Could not find spaces'
        }
      }
  }

  async deleteSpace(space_id: string) { 
    try {
        return await prisma.space.delete({
          where: {
            space_id: +space_id,
          }
        });
    } catch (error) {
      console.error(error)
      return {
        error: 'Could not delete space'
      }
    }
  }
}

