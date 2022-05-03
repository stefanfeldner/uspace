// eslint-disable-next-line camelcase
import { User_Space_Role } from '@prisma/client';
import { IIncomingUserSpaceRole } from '../interfaces/user-space-role.interface';
import { prisma } from '../prisma/prisma-client';

// eslint-disable-next-line camelcase
export const createUserSpaceRoleQuery = async (newUserSpaceRoleDetails: IIncomingUserSpaceRole): Promise<User_Space_Role> => prisma.user_Space_Role.create({
  data: newUserSpaceRoleDetails
});

// export const returnSpacesAndCreatorsQuery = async () => prisma.({
//   data:
// });

export const deleteSingleUserSpaceRoleQuery = async (spaceId: string): Promise<any> => prisma.user_Space_Role.deleteMany({
  where: {
    space_id: +spaceId // parse id to int
  }
});
