// eslint-disable-next-line camelcase
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../error-handling/custom-err.class';
import { IStrippedUser } from '../interfaces/spaceData.interface';
import { ISpacesAndCreator } from '../interfaces/spaces-and-creators.interface';
import { IIncomingUserSpaceRole, IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { createUserSpaceRoleQuery, deleteSingleUserSpaceRoleQuery } from '../queries/user-space-role.queries';

const prisma = new PrismaClient();

// creates a single User_Space_Role
// eslint-disable-next-line camelcase
export const createUserSpaceRole = async (newUserSpaceRoleDetails: IIncomingUserSpaceRole): Promise<IUserSpaceRole> => {
  try {
    const userSpaceRole = await createUserSpaceRoleQuery(newUserSpaceRoleDetails);
    return { id: userSpaceRole.id, roleId: userSpaceRole.role_id, spaceId: userSpaceRole.space_id, userId: userSpaceRole.user_id };
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

export const returnSpacesAndCreators = async (): Promise<ISpacesAndCreator[]> => {
  try {
    const spacesAndCreators = await prisma.space.findMany({
      include: {
        User_Space_Role: {
          where: {
            role_id: 2
          },
          select: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                picture_url: true
              }
            }
          }
        }
      }
    });
    return spacesAndCreators.map<ISpacesAndCreator>((spaceAndCreator) => ({
      id: spaceAndCreator.id,
      name: spaceAndCreator.name,
      description: spaceAndCreator.description,
      createdAt: spaceAndCreator.created_at,
      userSpaceRoles: spaceAndCreator.User_Space_Role.map<{user: IStrippedUser}>((userSpaceRole) => ({
        user: {
          id: userSpaceRole.user.id,
          email: userSpaceRole.user.email,
          username: userSpaceRole.user.username,
          pictureUrl: userSpaceRole.user.picture_url
        }
      }))
    }));
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// delete single User_Space_role by space_id
export const deleteSingleUserSpaceRole = async (spaceId: string): Promise<number> => {
  try {
    const deletedRowCount = await deleteSingleUserSpaceRoleQuery(spaceId);
    return deletedRowCount.count; // returns count of deleted rows
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
