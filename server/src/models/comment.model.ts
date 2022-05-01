import { PrismaClient } from '@prisma/client';
import { Comment } from '../interfaces/comment.interface';

const prisma = new PrismaClient();

export class CommentModel {

  // creates a single post
  createComment(req: Comment) {     // TODO ADD TYPE HERE
    return async () => {
      try {
        const { user_id, post_id, content } = req;
      
        const comment = await prisma.comment.create({
          data: {
            user_id: user_id,
            post_id: post_id,
            content: content
          },
        });
        return comment;
      } catch (error) {
          return error;
      }
    }  
  };

  deleteComment(req: any) {     // TODO ADD TYPE HERE
    return async () => {
      try {
        const { comment_id } = req;

        const comment = prisma.comment.delete({
          where: {
            comment_id: comment_id,
          }
        })
        return comment;
      } catch (error) {
        return error
      }
    }
  }

}
