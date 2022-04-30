import { Comment, PrismaClient } from '@prisma/client';
import { IComment } from '../interfaces/comment.interface';

const prisma = new PrismaClient();

// creates a single comment
export const createComment = async (commentDetails: Comment): Promise<IComment> => {
  try {
    const comment = await prisma.comment.create({
      data: commentDetails
    });

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      userId: comment.user_id,
      postId: comment.post_id
    };
  } catch (error) {
    console.log('Error in createComment', error);
    throw new Error('A database error has occurred');
  }
};
