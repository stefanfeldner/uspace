import { PrismaClient } from '@prisma/client';
import { ErrorResponse } from '../interfaces/error.interface';
import { Post } from '../interfaces/post.interface';

const prisma = new PrismaClient();

export class PostModel {
  
  async createPost(req: Post) {
    try {
      const { user_id, space_id, title, tags, content } = req;
    
      return await prisma.post.create({
        data: {
          space_id: space_id,
          user_id: user_id,
          title: title,
          content: content,
          tags: tags,
        },
      });
    } catch (error) {
      console.error(error);
      return {
        error: 'Could not create post'
      }
    }
  };

  async deletePost(post_id: string) {
    try {
      return await prisma.post.delete({
        where: {
          post_id: +post_id
        }
      });
    } catch (error) {
      console.error(error);
      return {
        error: 'Could not delete post'
      }
    }
  }

}

