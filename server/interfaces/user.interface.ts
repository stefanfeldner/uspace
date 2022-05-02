import { User } from '@prisma/client';

export interface IUser{
  id: number,
  email: string,
  emailVerified: boolean,
  username: string,
  pictureUrl: string,
  sub:string,
  createdAt: Date
}

export interface IIncomingUser extends Omit<User, 'id'|'created_at'> {}
