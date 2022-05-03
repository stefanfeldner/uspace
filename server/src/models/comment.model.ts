import { PrismaClient } from '@prisma/client';
import { ErrorResponse } from '../interfaces/error.interface';
import { Comment } from '../interfaces/comment.interface';

const prisma = new PrismaClient();

export class CommentModel {

  async createComment(req: Comment): Promise<Comment | ErrorResponse> {
    try {
      const { user_id, post_id, content } = req;
    
      return await prisma.comment.create({
        data: {
          user_id: user_id,
          post_id: post_id,
          content: content
        },
      });
    } catch (error) {
        console.error(error)
        return {
          error: 'Could not create comment'
        }
    } 
  };

  async deleteComment(comment_id: string): Promise<Comment | ErrorResponse> {
    try {
      return await prisma.comment.delete({
        where: {
          comment_id: +comment_id,
        }
      });
    } catch (error) {
      console.error(error)
      return {
        error: 'Could not delete comment'
      }
    }
  }

}
