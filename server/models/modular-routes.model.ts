import { PrismaClient, Comment, Post, Space, User_Space_Role, User } from '@prisma/client'; //eslint-disable-line
import { CustomError } from '../error-handling/custom-err.class';
import { IComment } from '../interfaces/comment.interface';
import { IPost } from '../interfaces/post.interface';
import { IRole } from '../interfaces/role.interface';
import { ISpace } from '../interfaces/space.interface';
import { IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { IUser } from '../interfaces/user.interface';

const prisma = new PrismaClient();

type IAllTables = IComment | IPost | IRole | ISpace | IUserSpaceRole | IUser;

// modular route: returns all entries in a table
export const returnAllEntries = async (route: string): Promise <[IAllTables]> => {
  const tableName = route;

  try {
    // @ts-ignore
    const entries = await prisma[tableName].findMany();
    // For each table, loop through elements to change not camel cased property names to camel cased ones
    // (not camel cased in DB, camel cased as per linting rules)
    switch (tableName) {
      case 'Comment':
        entries.map((entry: Comment): IComment => {
          const newEntry: IComment = {
            id: entry.id,
            content: entry.content,
            createdAt: entry.created_at,
            userId: entry.user_id,
            postId: entry.post_id
          };
          return newEntry;
        });
        break;
      case 'Post':
        entries.map((entry: Post): IPost => {
          const newEntry: IPost = {
            id: entry.id,
            title: entry.title,
            tags: entry.tags,
            createdAt: entry.created_at,
            content: entry.content,
            userId: entry.user_id,
            spaceId: entry.space_id
          };
          return newEntry;
        });
        break;
      case 'Role':
        break;
      case 'Space':
        entries.map((entry: Space): ISpace => {
          const newEntry: ISpace = {
            id: entry.id,
            name: entry.name,
            description: entry.description,
            createdAt: entry.created_at
          };
          return newEntry;
        });
        break;
      case 'User_Space_Role':
        entries.map((entry: User_Space_Role): IUserSpaceRole => {  //eslint-disable-line
          const newEntry: IUserSpaceRole = {
            id: entry.id,
            userId: entry.user_id,
            spaceId: entry.space_id,
            roleId: entry.role_id
          };
          return newEntry;
        });
        break;
      case 'User':
        entries.map((entry: User): IUser => {
          const newEntry: IUser = {
            id: entry.id,
            email: entry.email,
            emailVerified: entry.email_verified,
            username: entry.username,
            pictureUrl: entry.picture_url,
            sub: entry.sub,
            createdAt: entry.created_at
          };
          return newEntry;
        });
        break;
      default: {
        throw new CustomError('A database error has occurred.');
      }
    }
    return entries;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// modular route: returns single entry in a table by id
export const returnEntryById = async (route: string, id: string): Promise<IAllTables> => {
  // extract path from url and remove slashes and plural 's'
  const tableName = route.match(/(\/\w+\/)/g)![0].slice(1, -2);

  try {
    if (!tableName) {
      throw new CustomError('A database error has occurred.');
    } else {
      // @ts-ignore
      const user = await prisma[tableName].findUnique({
        where: {
          id: +id // parsed string
        }
      });
      return user;
    }
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
