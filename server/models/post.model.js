import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// creates a single post
const createPost = async (req) => {
  try {
    const { title, tags, created_at: createdAt, content, user_id: userId, space_id: spaceId } = req;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        createdAt,
        tags,
        userId,
        spaceId
      }
    });

    return post;
  } catch (error) {
    return error;
  }
};

// delete single post and comments inside
const deleteSinglePost = async (id) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: +id // parse id to int
      }
    })
    return deletedPost;
  } catch (error) {
    return error
  }
}

export default {
  createPost,
  deleteSinglePost
};
