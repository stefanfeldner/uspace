import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// creates a single User_Space_Role
const createUserSpaceRole = async (req) => {
  try {
    const { user_id: userId, space_id: spaceId, role_id: roleId } = req;

    const userSpaceRole = await prisma.User_Space_Role.create({
      data: {
        userId,
        spaceId,
        roleId
      }
    });

    return userSpaceRole;
  } catch (error) {
    return error;
  }
};

const returnSpacesAndCreators = async () => {
  const spacesAndCreators = await prisma.space.findMany({
    include: {
      User_Space_Role: {
        where: {
          role_id: 2
        },
        select: {
          user: {
            select: {
              username: true,
              email: true,
              picture_url: true
            }
          }
        }
      }
    }
  });
  return spacesAndCreators;
};

// delete single User_Space_role by space_id
const deleteSingleUserSpaceRole = async (spaceId) => {
  try {
    const deletedRowCount = await prisma.User_Space_Role.deleteMany({
      where: {
        space_id: +spaceId // parse id to int
      }
    })
    return deletedRowCount; // returns count of deleted rows
  } catch (error) {
    return error
  }
}

export default {
  createUserSpaceRole,
  returnSpacesAndCreators,
  deleteSingleUserSpaceRole
};
