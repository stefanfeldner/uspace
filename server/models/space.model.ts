import { Post, PrismaClient, Space, Comment } from '@prisma/client';
import { IComment } from '../interfaces/comment.interface';
import { IPostWithComments, ISpaceData, IStrippedUser } from '../interfaces/spaceData.interface';
import { ISpace } from '../interfaces/space.interface';
import { CustomError } from '../error-handling/custom-err.class';

const prisma = new PrismaClient();

// creates a single space
export const createSpace = async (newSpaceDetails: Space): Promise<ISpace> => {
  try {
    const space = await prisma.space.create({
      data: newSpaceDetails
    });
    return { id: space.id, name: space.name, description: space.description, createdAt: space.created_at };
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

export const returnSpaceData = async (id: string): Promise<ISpaceData | null> => {
  try {
    const spaceData = await prisma.space.findUnique({
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

    if (!spaceData) {
      return null;
    }
    const sdata: ISpaceData = {
      id: spaceData.id,
      name: spaceData.name,
      description: spaceData.description,
      createdAt: spaceData.created_at,
      posts: spaceData.Post.map<IPostWithComments>((post: Post & { Comment: Comment[] }) => ({
        id: post.id,
        title: post.title,
        userId: post.user_id,
        spaceId: post.space_id,
        createdAt: post.created_at,
        content: post.content,
        tags: post.tags,
        comments: post.Comment.map<IComment>((comment: Comment) => ({ id: comment.id, content: comment.content, createdAt: comment.created_at, postId: comment.post_id, userId: comment.user_id }))
      })),
      userSpaceRoles: spaceData.User_Space_Role.map<{user: IStrippedUser}>((userSpaceRole: {
      user: {
          id: number;
          username: string;
          email: string;
          picture_url: string;
      };
  }) => ({
        user: {
          id: userSpaceRole.user.id,
          username: userSpaceRole.user.username,
          email: userSpaceRole.user.email,
          pictureUrl: userSpaceRole.user.picture_url

        }
      }))
    };
    return sdata;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// delete single space and posts/comments inside
export const deleteSingleSpace = async (id: string): Promise<number> => {
  try {
    const deletedSpace = await prisma.space.delete({
      where: {
        id: +id // parse id to int
      }
    });
    return deletedSpace.id;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
