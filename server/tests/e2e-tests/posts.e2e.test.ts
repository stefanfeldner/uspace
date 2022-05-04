import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';

import request from 'supertest';
import { IUser } from '../../interfaces/user.interface';
import { ISpace } from '../../interfaces/space.interface';
import { IIncomingPost, IPost } from '../../interfaces/post.interface';

const _addMockUser = async (): Promise<IUser> => {
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
const _addMockSpace = async (): Promise<ISpace> => {
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

describe('Prisma Tests', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.space.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  describe('POST /posts', () => {
    it('Should add a post to the database.', async () => {
      const _mockUser = await _addMockUser();
      const _mockSpace = await _addMockSpace();
      const MOCK_REQ: IIncomingPost = {
        title: 'Example Post',
        tags: 'Tags',
        content: 'Example Content For a Post',
        userId: _mockUser.id,
        spaceId: _mockSpace.id
      };
      const MOCK_RES: IPost = {
        ...MOCK_REQ,
        id: 0,
        createdAt: new Date()
      };
      const { body: post } = await request(app)
        .post('/posts')
        .expect('Content-Type', /json/)
        .send(MOCK_REQ)
        .expect(201);
      const dbEntry = await prisma.post.findUnique({ where: { id: post.id } });
      expect(dbEntry?.space_id).toBe(_mockSpace.id);
      expect(Object.keys(post).sort()).toEqual(Object.keys(MOCK_RES).sort());
    });
    it('Should send error back when something goes wrong.', async () => {
      const { body: post } = await request(app)
        .post('/posts')
        .expect('Content-Type', /json/)
        .send({})
        .expect(500);
      expect(post).toEqual({ error: 'A database error has occurred.' });
    });
  });
});
