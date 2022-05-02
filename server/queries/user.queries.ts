import { User } from '@prisma/client';
import { IIncomingUser } from '../interfaces/user.interface';
import { prisma } from '../prisma/prisma-client';

export const createUserQuery = async (newUserDetails : IIncomingUser): Promise<User> => await prisma.user.create(
  { data: newUserDetails }
);

export const findFirstQuery = async (sub: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      sub
    }
  });
};
