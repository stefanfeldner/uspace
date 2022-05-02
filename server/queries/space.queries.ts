import { Post, Space, Comment } from '@prisma/client';
import { IIncomingSpace } from '../interfaces/space.interface';
import { prisma } from '../prisma/prisma-client';

export const createSpaceQuery = async (newSpaceDetails: IIncomingSpace):Promise<Space> => prisma.space.create({
  data: newSpaceDetails
});

export const findSpaceDataQuery = async (id: string): Promise<(Space & {
  Post: (Post & {
      Comment: Comment[];
  })[];
  User_Space_Role: {
      user: {
          id: number;
          username: string;
          email: string;
          picture_url: string;
      };
  }[];
}) | null> => await prisma.space.findUnique({
  where: {
    id: +id
  },
  include: {
    Post: {
      include: {
        Comment: true
      }
    },
    User_Space_Role: {
      where: {
        role_id: 2
      },
      select: {
        user: {
          select: {
            username: true,
            email: true,
            picture_url: true,
            id: true
          }
        }
      }
    }
  }
});

export const deleteSpaceQuery = async (id: string): Promise<Space> => await prisma.space.delete({
  where: {
    id: +id // parse id to int
  }
});
