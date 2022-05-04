import { IPost } from '../../interfaces/post.interface';
import { ISpace } from '../../interfaces/space.interface';
import { IUser } from '../../interfaces/user.interface';
import { prisma } from '../../prisma/prisma-client';

export const addMockUser = async (): Promise<IUser> => {
  const MOCK_USER = {
    email: 'test@test.com',
    email_verified: false,
    username: 'testUsername',
    picture_url: '/fakeImageUrl.png',
    sub: 'subText'
  };
  const dbUser = await prisma.user.create({ data: MOCK_USER });
  const user: IUser = {
    id: dbUser.id,
    createdAt: dbUser.created_at,
    email: dbUser.email,
    emailVerified: dbUser.email_verified,
    pictureUrl: dbUser.picture_url,
    sub: dbUser.sub,
    username: dbUser.username
  };
  return user;
};

export const addMockSpace = async (): Promise<ISpace> => {
  const MOCK_SPACE = {
    name: 'Mock Spacee',
    description: 'Mock Space Description'
  };
  const dbSpace = await prisma.space.create({ data: MOCK_SPACE });
  const space: ISpace = {
    id: dbSpace.id,
    createdAt: dbSpace.created_at,
    description: dbSpace.description,
    name: dbSpace.name
  };
  return space;
};

export const addMockPost = async (): Promise<IPost> => {
  const _mockUser = await addMockUser();
  const _mockSpace = await addMockSpace();
  const MOCK_POST = {
    title: 'Example Post',
    tags: 'Tags',
    content: 'Example Content For a Post',
    user_id: _mockUser.id,
    space_id: _mockSpace.id
  };
  const dbPost = await prisma.post.create({ data: MOCK_POST });
  const post: IPost = {
    id: dbPost.id,
    title: dbPost.title,
    tags: dbPost.tags,
    createdAt: dbPost.created_at,
    content: dbPost.content,
    userId: dbPost.user_id,
    spaceId: dbPost.space_id
  };
  return post;
};
