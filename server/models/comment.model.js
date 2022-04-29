import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// creates a single comment
const createComment = async (req) => {
  try {
    const { content, user_id: userId, post_id: postId } = req;

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId
      }
    });

    return comment;
  } catch (error) {
    return error;
  }
};

export default {
  createComment
};
