import { Post, Comment } from '@prisma/client';
import { IComment } from '../interfaces/comment.interface';
import { IPostWithComments, ISpaceData } from '../interfaces/spaceData.interface';
import { IIncomingSpace, ISpace } from '../interfaces/space.interface';
import { CustomError } from '../error-handling/custom-err.class';
import { createSpaceQuery, deleteSpaceQuery, findSpaceDataQuery } from '../queries/space.queries';
import { IUser } from '../interfaces/user.interface';

// creates a single space
export const createSpace = async (newSpaceDetails: IIncomingSpace): Promise<ISpace> => {
  try {
    const space = await createSpaceQuery(newSpaceDetails);
    return { id: space.id, name: space.name, description: space.description, createdAt: space.created_at };
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

export const returnSpaceData = async (id: string): Promise<ISpaceData | null> => {
  try {
    const spaceData = await findSpaceDataQuery(id);

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
      userSpaceRoles: spaceData.User_Space_Role.map<{user: Omit<IUser, 'createdAt'|'emailVerified'|'sub'>}>((userSpaceRole: {
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
    const deletedSpace = await deleteSpaceQuery(id);
    return deletedSpace.id;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
