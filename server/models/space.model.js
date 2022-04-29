import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// creates a single space
const createSpace = async (req) => {
  try {
    const { name, description } = req;

    const space = await prisma.space.create({
      data: {
        name,
        description
      }
    });

    return space;
  } catch (error) {
    return error;
  }
};

const returnSpaceData = async (id) => {
  const spaceData = await prisma.space.findMany({
    where: {
      id: +id
    },
    include: {
      Post: {
        include: {
          Comment: true
        }
      },
      User_Space_Role: {
        where: {
          role_id: 2
        },
        select: {
          user: {
            select: {
              username: true,
              email: true,
              picture_url: true,
              id: true
            }
          }
        }
      }
    }
  });
  return spaceData;
};

// delete single space and posts/comments inside
const deleteSingleSpace = async (id) => {
  try {
    const deletedSpace = await prisma.space.delete({
      where: {
        id: +id // parse id to int
      }
    })
    return deletedSpace;
  } catch (error) {
    return error
  }
}

export default {
  createSpace,
  returnSpaceData,
  deleteSingleSpace
};
