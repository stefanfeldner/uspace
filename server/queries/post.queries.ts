import { prisma } from '../prisma/prisma-client';
import { Post } from '@prisma/client';
import { IIncomingPost } from '../interfaces/post.interface';

export const createPostQuery = async (postDetails: IIncomingPost): Promise<Post> => await prisma.post.create({
  data: postDetails
});

export const deletePostQuery = async (id: string): Promise<Post> => await prisma.post.delete({
  where: {
    id: +id // parse id to int
  }
});
