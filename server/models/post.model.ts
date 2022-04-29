import { Post, PrismaClient } from '@prisma/client';
import { IPost } from '../interfaces/post.interface';

const prisma = new PrismaClient();

// creates a single post
export const createPost = async (postDetails: Post): Promise<IPost> => {
  try {
    const post = await prisma.post.create({
      data: postDetails
    });
    return { id: post.id, content: post.content, createdAt: post.created_at, spaceId: post.space_id, tags: post.tags, title: post.title, userId: post.user_id };
  } catch (error) {
    throw new Error('A database error has occurred.');
  }
};

// delete single post and comments inside
export const deleteSinglePost = async (id: string): Promise<number> => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: +id // parse id to int
      }
    });
    return deletedPost.id;
  } catch (error) {
    throw new Error('A database error has occurred.');
  }
};
