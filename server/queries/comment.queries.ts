import { prisma } from '../prisma/prisma-client';
import { Comment } from '@prisma/client';
import { IIncomingComment } from '../interfaces/comment.interface';

export const createCommentQuery = (commentDetails: IIncomingComment): Promise<Comment> => prisma.comment.create({
  data: commentDetails
});
