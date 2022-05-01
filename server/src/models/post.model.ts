import { PrismaClient } from '@prisma/client';
import { Post } from '../interfaces/post.interface';

const prisma = new PrismaClient();

export class PostModel {

  // creates a single post
  createPost(req: Post) {     // TODO ADD TYPE HERE
    return async () => {
      try {
        const { user_id, space_id, title, tags, content } = req;
      
        const post = await prisma.post.create({
          data: {
            space_id: space_id,
            user_id: user_id,
            title: title,
            content: content,
            tags: tags,
          },
        });
        return post;
      } catch (error) {
          return error;
      }
    }  
  };

  deletePost(req: any) {
    return async () => {
      try {
        
        const { post_id } = req;

        const post = prisma.post.delete({
          where: {
            post_id: post_id,
          }
        })
        return post;
      } catch (error) {
        return error
      }
    }
  }

}

