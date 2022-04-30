import { PrismaClient, User } from '@prisma/client';
import { CustomError } from '../error-handling/custom-err.class';
import { IUser } from '../interfaces/user.interface';

const prisma = new PrismaClient();

// creates a single user
export const createUser = async (newUserDetails: User): Promise<IUser> => {
  try {
    const user = await prisma.user.create(
      { data: newUserDetails }
    );
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      emailVerified: user.email_verified,
      createdAt: user.created_at,
      pictureUrl: user.picture_url,
      sub: user.sub
    };
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// find user by sub and return
export const returnUserBySub = async (sub: string): Promise<IUser| null> => {
  try {
    const prismaUser = await prisma.user.findFirst({
      where: {
        sub
      }
    });
    if (!prismaUser) {
      return null;
    }
    const user: IUser = {
      id: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.username,
      emailVerified: prismaUser.email_verified,
      createdAt: prismaUser.created_at,
      pictureUrl: prismaUser.picture_url,
      sub: prismaUser.sub
    };
    return user;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
