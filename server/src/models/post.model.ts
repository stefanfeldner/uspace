import { PrismaClient } from '@prisma/client';
import { Post } from '../interfaces/post.interface';

const prisma = new PrismaClient();

export class PostModel {
    // creates a single user
    createPost(req: Post): any {     // TODO ADD TYPE HERE
      return async (req: Post) => {
        try {
            const { user_id, space_id, title, tags, content } = req;
        
            const post = await prisma.post.create({
              data: {
                user_id,
                space_id,
                title,
                content,
                tags,
              },
            });

            return post;
        } catch (error) {
            return error;
        }
      } 
 
   
    };

}

