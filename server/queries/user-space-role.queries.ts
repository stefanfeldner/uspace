// eslint-disable-next-line camelcase
import { User_Space_Role } from '@prisma/client';
import { ISpacesAndCreator } from '../interfaces/spaces-and-creators.interface';
import { IIncomingUserSpaceRole } from '../interfaces/user-space-role.interface';
import { prisma } from '../prisma/prisma-client';

// eslint-disable-next-line camelcase
export const createUserSpaceRoleQuery = async (newUserSpaceRoleDetails: IIncomingUserSpaceRole): Promise<User_Space_Role> => prisma.user_Space_Role.create({
  data: newUserSpaceRoleDetails
});

export const returnSpacesAndCreatorsQuery = async (): Promise<ISpacesAndCreator[]> => {
  const dbSpacesAndCreators = await prisma.space.findMany({
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
  const spacesAndCreators: ISpacesAndCreator[] = dbSpacesAndCreators.map<ISpacesAndCreator>((spaceAndCreator) => ({
    createdAt: spaceAndCreator.created_at,
    id: spaceAndCreator.id,
    description: spaceAndCreator.description,
    name: spaceAndCreator.name,
    userSpaceRoles: spaceAndCreator.User_Space_Role.map<{user: {id: number, email: string, pictureUrl: string, username: string}}>((dbUserSpaceRole) => ({ user: { id: dbUserSpaceRole.user.id, email: dbUserSpaceRole.user.email, pictureUrl: dbUserSpaceRole.user.picture_url, username: dbUserSpaceRole.user.username } }))
  }));
  return spacesAndCreators;
};
export const deleteSingleUserSpaceRoleQuery = async (spaceId: string): Promise<any> => prisma.user_Space_Role.deleteMany({
  where: {
    space_id: +spaceId // parse id to int
  }
});
